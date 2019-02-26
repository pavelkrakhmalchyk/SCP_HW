var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var CONSTANTS = $.import('utilites', 'constants').constants;

var address = function (connection) {
    this.doGet = function(){
        const statement = `select * from "${CONSTANTS.ADDRESS_TABLE}"`;
        const result = connection.executeQuery(statement);
        
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }


    this.doPost = function (oAddress) {
        oAddress.adrid = getNextValue(CONSTANTS.ADDRESS_SEQ_NAME);

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