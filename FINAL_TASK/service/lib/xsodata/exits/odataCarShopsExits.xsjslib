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

    oCarShop.create_time = new Date().toISOString();
    oCarShop.update_time = new Date().toISOString();
    
    var oCreateStatment = StatementCreator.createInsertStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues);

    sStatement = "TRUNCATE TABLE \"" + afterTableName + "\"";
    OdataHelper.executeUpdate(param.connection, sStatement);

    oCreateStatment = StatementCreator.createInsertStatement(afterTableName, oCarShop)
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues); 
}


function carShopUpdate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = OdataHelper.executeQuery(param.connection, sStatement);

    var oCarShopItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    delete oCarShop.create_time;
    oCarShop.update_time = new Date().toISOString();

    var oUpdateStatment = StatementCreator.createUpdateStatement(CONSTANTS.CARSHOP_TABLE, oCarShop);
    OdataHelper.executeUpdate(param.connection, oUpdateStatment.sql, oUpdateStatment.aValues);
}


