const StatementCreator = $.import('xsjs.statement', 'statementCreator').statementCreator;
const statementCreator = new StatementCreator();



var user = function (connection) {
    const Sequence = $.import('xsjs.sequence', 'sequence').sequence;
    const sequence = new Sequence(connection);

    const USER_TABLE = "HiMTA_Lect3::User";

    this.doGet = function(){
        const statement = 'select * from "HiMTA_Lect3::User"';
        const result = connection.executeQuery(statement);
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }

    this.doPost = function (oUser) {
        oUser.usid = sequence.getNextValue("HiMTA_Lect3::usid");

        //generate query
        const statement = statementCreator.createInsertStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        const statement = statementCreator.createUpdateStatement(USER_TABLE, oUser);
        //execute update
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

    
};
