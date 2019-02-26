var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var CONSTANTS = $.import('utilites', 'constants').constants;
var Sequence = $.import('xsjs', 'sequence').sequence;

var car = function (connection) {
    this.doGet = function(){
        const statement = `select * from "${CONSTANTS.CAR_TABLE}"`;
        const result = connection.executeQuery(statement);
        
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }


    this.doPost = function (oCar) {
        oCar.crid = Sequence.getNextValue(connection, CONSTANTS.CAR_SEQ_NAME);
        oCar.create_time = new Date().toISOString();
        oCar.update_time = new Date().toISOString();

        const statement = StatementCreator.createInsertStatement(CONSTANTS.CAR_TABLE, oCar);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCar));
    };


    this.doPut = function (oCar) {
        oCar.update_time = new Date().toISOString();

        const statement = StatementCreator.createUpdateStatement(CONSTANTS.CAR_TABLE, oCar);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCar));
    };


    this.doDelete = function (crid) {
        const statement = StatementCreator.createDeleteStatement(CONSTANTS.CAR_TABLE, {crid: crid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };
};