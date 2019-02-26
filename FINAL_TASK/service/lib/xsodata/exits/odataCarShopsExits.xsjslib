var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var JsonParser = $.import('utilites', 'jsonParser').jsonParser;
var OdataHelper = $.import('xsodata.exits', 'odataHelper').odataHelper;
var CONSTANTS = $.import('utilites', 'constants').constants;


function carShopCreate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = OdataHelper.executeQuery(param.connection, sStatement);

    var oCarShopItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    sStatement = `select "${CONSTANTS.CARSHOP_SEQ_NAME}".NEXTVAL as "ID" from dummy`;
	var rs = OdataHelper.executeQuery(param.connection, sStatement);

	while (rs.next()) {
		oCarShop.shopid = rs.getString(1);
	}
    
    var oCreateStatment = StatementCreator.createInsertStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues);

    sStatement = "TRUNCATE TABLE \"" + afterTableName + "\"";
    OdataHelper.executeUpdate(param.connection, sStatement);

    oCreateStatment = StatementCreator.createInsertStatement(afterTableName, oCarShop);
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues); 

    createAddressForCarshop(param, oCarShop.shopid);
}


function carShopUpdate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = OdataHelper.executeQuery(param.connection, sStatement);

    var oCarShopItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    var oUpdateStatment = StatementCreator.createUpdateStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
    OdataHelper.executeUpdate(param.connection, oUpdateStatment.sql, oUpdateStatment.aValues);
}


function carShopDelete(param){
    var beforeTableName = param.beforeTableName;

    var sStatement = "select * from \"" + beforeTableName + "\"";
    var oResult = OdataHelper.executeQuery(param.connection, sStatement);

    var oCarShopItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    var oDeleteStatement = StatementCreator.createDeleteStatement(CONSTANTS.CARSHOP_TABLE, {shopid: oCarShop.shopid});
    OdataHelper.executeUpdate(param.connection, oDeleteStatement.sql, oDeleteStatement.aValues);

    oDeleteStatement = StatementCreator.createDeleteStatement(CONSTANTS.CAR_TABLE, {shopid: oCarShop.shopid});
    OdataHelper.executeUpdate(param.connection, oDeleteStatement.sql, oDeleteStatement.aValues);

    oDeleteStatement = StatementCreator.createDeleteStatement(CONSTANTS.ADDRESS_TABLE, {shopid: oCarShop.shopid});
    OdataHelper.executeUpdate(param.connection, oDeleteStatement.sql, oDeleteStatement.aValues);
}


function createAddressForCarshop(param, shopid){
    var oAddress = {};

    var sStatement = `select "${CONSTANTS.ADDRESS_SEQ_NAME}".NEXTVAL as "ID" from dummy`;
	var rs = OdataHelper.executeQuery(param.connection, sStatement);

	while (rs.next()) {
		oAddress.adrid = rs.getString(1);
	};

    oAddress.shopid = shopid;
    oAddress.city = "-";
    oAddress.strt = "-";
    oAddress.hnum = "-";

    var oCreateStatment =  StatementCreator.createInsertStatement(CONSTANTS.ADDRESS_TABLE, oAddress);
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues);
}


