var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var CONSTANTS = $.import('utilites', 'constants').constants;

var carShop = function (connection) {

    this.doGet = function(){
        const statement = `select * from "${CONSTANTS.CARSHOP_TABLE}"`;
        const result = connection.executeQuery(statement);
        
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }


    this.doPost = function (oCarShop) {
        oCarShop.shopid = getNextValue(CONSTANTS.CARSHOP_SEQ_NAME);
        oCarShop.create_time = new Date().toISOString();
        oCarShop.update_time = new Date().toISOString();

        const statement = StatementCreator.createInsertStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCarShop));
    };


    this.doPut = function (oCarShop) {
        oCarShop.update_time = new Date().toISOString();

        const statement = StatementCreator.createUpdateStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCarShop));
    };


    this.doDelete = function (shopid) {
        const statementForCarshop = StatementCreator.createDeleteStatement(CONSTANTS.CARSHOP_TABLE, {shopid: shopid});
        connection.executeUpdate(statementForCarshop.sql, statementForCarshop.aValues);

        const statementForCars = StatementCreator.createDeleteStatement(CONSTANTS.CAR_TABLE, {shopid: shopid});
        connection.executeUpdate(statementForCars.sql, statementForCars.aValues);

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
