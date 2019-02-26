var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var CONSTANTS = $.import('utilites', 'constants').constants;
var Sequence = $.import('xsjs', 'sequence').sequence;

var address = function (connection) {
    this.doGet = function(){
        const statement = `select * from "${CONSTANTS.ADDRESS_TABLE}"`;
        const result = connection.executeQuery(statement);
        
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }


    this.doPost = function (oAddress) {
        oAddress.adrid = Sequence.getNextValue(connection, CONSTANTS.ADDRESS_SEQ_NAME);

        const statement = StatementCreator.createInsertStatement(CONSTANTS.ADDRESS_TABLE, oAddress);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oAddress));
    };


    this.doPut = function (oAddress) {
        const statement = StatementCreator.createUpdateStatement(CONSTANTS.ADDRESS_TABLE, oAddress);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oAddress));
    };


    this.doDelete = function (adrid) {
        const statement = StatementCreator.createDeleteStatement(CONSTANTS.ADDRESS_TABLE, {adrid: adrid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };
};