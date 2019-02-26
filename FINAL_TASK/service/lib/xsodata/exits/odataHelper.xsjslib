var odataHelper = class OdataHelper {

    static executeUpdate(connection, statement, valuesArray) {
        var pStmt = connection.prepareStatement(statement);

        if(valuesArray != undefined) {
            for (var j = 0; j < valuesArray.length; j++){
                pStmt.setString(j + 1, valuesArray[j].toString());
            }  
        }

        pStmt.executeUpdate();
        pStmt.close(); 
    }

    static executeQuery(connection, statement){
        var pStmt = connection.prepareStatement(statement);
        var oResult = pStmt.executeQuery();
        pStmt.close(); 

        return oResult;
    }
};




