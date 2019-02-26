var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var JsonParser = $.import('utilites', 'jsonParser').jsonParser;
var OdataHelper = $.import('xsodata.exits', 'odataHelper').odataHelper;
var CONSTANTS = $.import('utilites', 'constants').constants;


function carCreate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = OdataHelper.executeQuery(param.connection, sStatement);

    var oCarItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCar = OdataHelper.items[0];

    sStatement = `select "${CONSTANTS.CAR_SEQ_NAME}".NEXTVAL as "ID" from dummy`;
	var rs = OdataHelper.executeQuery(param.connection, sStatement);

	while (rs.next()) {
		oCar.crid = rs.getString(1);
	}

    oCar.create_time = new Date().toISOString();
    oCar.update_time = new Date().toISOString();
    
    var oCreateStatment = StatementCreator.createInsertStatement(CONSTANTS.CAR_TABLE, oCar);
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues);

    sStatement = "TRUNCATE TABLE \"" + afterTableName + "\"";
    OdataHelper.executeUpdate(param.connection, sStatement);

    oCreateStatment = StatementCreator.createInsertStatement(afterTableName, oCar)
    OdataHelper.executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues); 
}


function carUpdate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = OdataHelper.executeQuery(param.connection, sStatement);

    var oCarItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCar = oCarItems.items[0];

    delete oCar.create_time;
    oCar.update_time = new Date().toISOString();

    var oUpdateStatment = StatementCreator.createUpdateStatement(CONSTANTS.CAR_TABLE, oCar);
    OdataHelper.executeUpdate(param.connection, oUpdateStatment.sql, oUpdateStatment.aValues);
}