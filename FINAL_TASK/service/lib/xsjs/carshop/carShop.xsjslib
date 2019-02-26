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

        const statement = StatementCreator.createInsertStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
        connection.executeUpdate(statement.sql, statement.aValues);

        createAddressForCarshop(oCarShop.shopid);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCarShop));
    };


    this.doPut = function (oCarShop) {
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

        const statementForAddress = StatementCreator.createDeleteStatement(CONSTANTS.ADDRESS_TABLE, {shopid: shopid});
        connection.executeUpdate(statementForAddress.sql, statementForAddress.aValues);

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

    function createAddressForCarshop(shopid){
        var oAddress = {};

        oAddress.adrid = getNextValue(CONSTANTS.CARSHOP_SEQ_NAME);
        oAddress.shopid = shopid;
        oAddress.city = "-";
        oAddress.strt = "-";
        oAddress.hnum = "-";

        var oCreateStatment =  StatementCreator.createInsertStatement(CONSTANTS.ADDRESS_TABLE, oAddress);
        connection.executeUpdate(oCreateStatment.sql, oCreateStatment.aValues);
    }
};
