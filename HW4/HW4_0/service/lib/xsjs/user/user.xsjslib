const StatementCreator = $.import('xsjs.statement', 'statementCreator').statementCreator;
const statementCreator = new StatementCreator();

var user = function (connection) {

    const USER_TABLE = "HiMTA::User";
    const SEQ_NAME = "HiMTA::usid";

    this.doGet = function(){
        const statement = `select * from "${USER_TABLE}"`;
        const result = connection.executeQuery(statement);
        
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }

    this.doPost = function (oUser) {
        oUser.usid = getNextValue(SEQ_NAME);

        const statement = statementCreator.createInsertStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        const statement = statementCreator.createUpdateStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doDelete = function (usid) {
        const statement = statementCreator.createDeleteStatement(USER_TABLE, {usid: usid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextValue (sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }
};
