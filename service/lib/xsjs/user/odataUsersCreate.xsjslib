const StatementCreator = $.import('xsjs.statement', 'statementCreator').statementCreator;
const statementCreator = new StatementCreator();

const Sequence = $.import('xsjs.sequence', 'sequence').sequence;
const sequence = new Sequence($.hdb.getConnection({
    treatDateAsUTC: true
}));

function userCreate(param){
    $.trace.error(JSON.stringify(param));
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = recordSetToJSON(oResult, "items");

    var oUser = oUserItems.items[0];
    $.trace.error(JSON.stringify(oUser));

    oUser.usid = sequence.getNextValue("HiMTA_Lect3::usid");
    pStmt.close();

    for(var i = 0; i < 2; i++){
        var createStatment;
		var pStmt;
		if(i < 1){
			createStatment = statementCreator.createInsertStatement("HiMTA_Lect3::User", oUser);
            pStmt = param.connection.prepareStatement(createStatment.sql);			
		} else {
			pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
			pStmt.executeUpdate();
			pStmt.close();
			pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );		
		}

		for (var j = 0; j < createStatment.aValues.length; j++){
            $.trace.error("Value =" + createStatment.aValues[j].toString());
            pStmt.setString(j + 1, createStatment.aValues[j].toString());
        }   
		pStmt.executeUpdate();
		pStmt.close();
	}    
}

function userUpdate(param){
    $.trace.error(JSON.stringify(param));
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = recordSetToJSON(oResult, "items");

    var oUser = oUserItems.items[0];
    $.trace.error(JSON.stringify(oUser));

    pStmt.close();

    for(var i = 0; i < 2; i++){
        var createStatment;
		var pStmt;
		if(i < 1){
			createStatment = statementCreator.createUpdateStatement("HiMTA_Lect3::User", oUser);
            pStmt = param.connection.prepareStatement(createStatment.sql);			

            for (var j = 0; j < createStatment.aValues.length; j++){
                $.trace.error("Value i = 0 =" + createStatment.aValues[j].toString());
                pStmt.setString(j + 1, createStatment.aValues[j].toString());
            }  
		} else {
			pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
			pStmt.executeUpdate();
			pStmt.close();
			pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );
            
            pStmt.setString(1, createStatment.aValues[1].toString());
            pStmt.setString(2, createStatment.aValues[0].toString());	
		}

		pStmt.executeUpdate();
		pStmt.close();
	}    
}

function recordSetToJSON(rs, rsName){
    rsName = typeof rsName !== 'undefined' ? rsName : 'entries';

    var meta = rs.getMetaData();
    var colCount = meta.getColumnCount();
    var values=[];
    var table=[];
    var value="";
    while (rs.next()) {
        for (var i=1; i<=colCount; i++) {
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