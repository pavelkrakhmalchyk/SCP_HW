var statementCreator = function () {

    var statement = {
        aParams: [],
        aValues: [],
        sql: "",
    };

    this.createInsertStatement = function (sTableName, oValueObject) {

        let sColumnList = '', sValueList = '';

        for (let key in oValueObject){
            sColumnList += `"${key}", `;
            statement.aParams.push(key);

            sValueList += "?, ";
            statement.aValues.push(oValueObject[key]);
        }

        sColumnList = sColumnList.slice(0, -2);
        sValueList = sValueList.slice(0, -2);

        statement.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + statement.sql);
        return statement;
    };

    this.createUpdateStatement = function (sTableName, oValueObject) {

        let sSetClause = '';

        let keys = Object.keys(oValueObject);
        let values = Object.values(oValueObject);

        for (var i = 1; i < keys.length; i++){
            statement.aParams.push(keys[i]);
            sSetClause += `"${keys[i]}" = ?, `;
        }

        for (var i = 1; i < values.length; i++){
            statement.aValues.push(values[i]);
        }
        statement.aValues.push(values[0]);

        sSetClause = sSetClause.slice(0, -2);

        statement.sql = `update "${sTableName}" set ${sSetClause} where "${keys[0]}" = ?`; 

        
        $.trace.error("sql to update: " + statement.sql);
        $.trace.error("sql to update: " + statement.sql);
        return statement;
    };

    this.createDeleteStatement = function (sTableName, oValueObject) {

        let sWhereClause = '';

        for (let key in oValueObject){
            sWhereClause += `"${key}" = ? and `;
            statement.aParams.push(key);

            statement.aValues.push(oValueObject[key]);
        }

        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = "where " + sWhereClause;
        }

        statement.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + statement.sql);
        return statement;
    };
};

