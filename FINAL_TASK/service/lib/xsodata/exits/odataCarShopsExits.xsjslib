var StatementCreator = $.import('utilites', 'statementCreator').statementCreator;
var JsonParser = $.import('utilites', 'jsonParser').jsonParser;

const CARSHOP_TABLE = "HiMTA::CarShop";
const SEQ_NAME = "HiMTA::shopid";


function carShopCreate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = executeQuery(param.connection, sStatement);

    var oCarShopItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    sStatement = `select "${SEQ_NAME}".NEXTVAL as "ID" from dummy`;
	var rs = executeQuery(param.connection, sStatement);

	while (rs.next()) {
		oCarShop.shopid = rs.getString(1);
	}

    oCarShop.create_time = new Date().toISOString();
    oCarShop.update_time = new Date().toISOString();
    
    var oCreateStatment = StatementCreator.createInsertStatement(CARSHOP_TABLE, oCarShop);
    executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues);

    sStatement = "TRUNCATE TABLE \"" + afterTableName + "\"";
    executeUpdate(param.connection, sStatement);

    oCreateStatment = StatementCreator.createInsertStatement(afterTableName, oCarShop)
    executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues); 
}


function carShopUpdate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = executeQuery(param.connection, sStatement);

    var oCarShopItems = JsonParser.recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    oCarShop.update_time = new Date().toISOString();

    var oUpdateStatment = StatementCreator.createUpdateStatement(CARSHOP_TABLE, oCarShop);
    executeUpdate(param.connection, oUpdateStatment.sql, oUpdateStatment.aValues);
}


function executeQuery(connection, statement){
    var pStmt = connection.prepareStatement(statement);
    var oResult = pStmt.executeQuery();
    pStmt.close(); 

    return oResult;
}


function executeUpdate(connection, statement, valuesArray) {
    var pStmt = connection.prepareStatement(statement);

    if(valuesArray != undefined) {
        for (var j = 0; j < valuesArray.length; j++){
            pStmt.setString(j + 1, valuesArray[j].toString());
        }  
    }

    pStmt.executeUpdate();
	pStmt.close(); 
}


