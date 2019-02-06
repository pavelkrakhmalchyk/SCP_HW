const StatementLib = $.import('xsjs.statement', 'statement').statement;
const statementLib = new StatementLib();

var user = function (connection) {

    const USER_TABLE = "HiMTA_Lect3::User";

    this.doGet = function(){
        const statement = 'select * from "HiMTA_Lect3::User"';
        const result = connection.executeQuery(statement);
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }

    this.doPost = function (oUser) {
        oUser.usid = getNextval("HiMTA_Lect3::usid");

        //generate query
        const statement = statementLib.createPreparedInsert(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        const statement = statementLib.createPreparedUpdate(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doDelete = function (oUser) {
        const statement = statementLib.createPreparedDelete(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }
};
