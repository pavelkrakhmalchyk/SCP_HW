const StatementCreator = $.import('xsjs.statement', 'statementCreator').statementCreator;
const statementCreator = new StatementCreator();

const CARSHOP_TABLE = "HiMTA::CarShop";
const SEQ_NAME = "HiMTA::shopid";


function carShopCreate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = executeQuery(param.connection, sStatement);

    var oCarShopItems = recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    sStatement = `select "${SEQ_NAME}".NEXTVAL as "ID" from dummy`;
	var rs = executeQuery(param.connection, sStatement);

	while (rs.next()) {
		oCarShop.shopid = rs.getString(1);
	}
    
    var oCreateStatment = statementCreator.createInsertStatement(CARSHOP_TABLE, oCarShop);
    executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues);

    sStatement = "TRUNCATE TABLE \"" + afterTableName + "\"";
    executeUpdate(param.connection, sStatement);

    oCreateStatment = statementCreator.createInsertStatement(afterTableName, oCarShop)
    executeUpdate(param.connection, oCreateStatment.sql, oCreateStatment.aValues); 
}


function carShopUpdate(param){
    var afterTableName = param.afterTableName;

    var sStatement = "select * from \"" + afterTableName + "\"";
    var oResult = executeQuery(param.connection, sStatement);

    var oCarShopItems = recordSetToJSON(oResult, "items");
    var oCarShop = oCarShopItems.items[0];

    var oUpdateStatment = statementCreator.createUpdateStatement(CARSHOP_TABLE, oCarShop);
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


function recordSetToJSON(rs, rsName){
    rsName = typeof rsName !== 'undefined' ? rsName : 'entries';

    var meta = rs.getMetaData();
    var colCount = meta.getColumnCount();
    var values=[];
    var table=[];
    var value="";
    while (rs.next()) {
        for (var i = 1; i <= colCount; i++) {
            value = '"'+meta.getColumnLabel(i)+'" : ';
            switch(meta.getColumnType(i)) {
                case $.db.types.VARCHAR:
                case $.db.types.CHAR:
                    value += '"'+ escapeSpecialChars(rs.getString(i))+'"';
                    break;
                case $.db.types.NVARCHAR:
                case $.db.types.NCHAR:
                case $.db.types.SHORTTEXT:
                    value += '"'+escapeSpecialChars(rs.getNString(i))+'"';
                    break;
                case $.db.types.TINYINT:
                case $.db.types.SMALLINT:
                case $.db.types.INT:
                case $.db.types.BIGINT:
                    value += rs.getInteger(i);
                    break;
                case $.db.types.DOUBLE:
                    value += rs.getDouble(i);
                    break;
                case $.db.types.DECIMAL:
                    value += rs.getDecimal(i);
                    break;
                case $.db.types.REAL:
                    value += rs.getReal(i);
                    break;
                case $.db.types.NCLOB:
                case $.db.types.TEXT:
                    value += '"'+ escapeSpecialChars(rs.getNClob(i))+'"';
                    break;
                case $.db.types.CLOB:
                    value += '"'+ escapeSpecialChars(rs.getClob(i))+'"';
                    break;
                case $.db.types.BLOB:
                    value += '"'+ $.util.convert.encodeBase64(rs.getBlob(i))+'"';
                    break;
                case $.db.types.DATE:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getDate(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                case $.db.types.TIME:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getTime(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                case $.db.types.TIMESTAMP:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getTimestamp(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                case $.db.types.SECONDDATE:
                    var dateTemp = new Date();
                    dateTemp.setDate(rs.getSeconddate(i));
                    var dateString = dateTemp.toJSON();
                    value += '"'+dateString+'"';
                    break;
                default:
                    value += '"'+escapeSpecialChars(rs.getString(i))+'"';
            }
            values.push(value);
        }
        table.push('{'+values+'}');
    }
    return JSON.parse('{"'+ rsName +'" : [' + table	+']}');

}


function escapeSpecialChars(input) {
    if(typeof(input) != 'undefined' && input != null)
    {
        return input
            .replace(/[\\]/g, '\\\\')
            .replace(/[\"]/g, '\\\"')
            .replace(/[\/]/g, '\\/')
            .replace(/[\b]/g, '\\b')
            .replace(/[\f]/g, '\\f')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r')
            .replace(/[\t]/g, '\\t'); }
    else{
        return "";
    }
}