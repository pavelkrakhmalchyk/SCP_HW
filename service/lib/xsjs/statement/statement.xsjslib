var statement = function () {

    var oResult = {
        aParams: [],
        aValues: [],
        sql: "",
    };

    this.createPreparedInsert = function (sTableName, oValueObject) {

        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(key => {
            sColumnList += `"${key}", `;
            oResult.aParams.push(key);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

        sColumnList = sColumnList.slice(0, -2);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    this.createPreparedUpdate = function (sTableName, oValueObject) {

        let params = '';

        let keys = Object.keys(oValueObject);
        let values = Object.values(oValueObject);

        for (var i = 1; i < keys.length; i++){
            oResult.aParams.push(keys[i]);
            params += `"${keys[i]}" = ?, `;
        }

        for (var i = 1; i < values.length; i++){
            oResult.aValues.push(values[i]);
        }

        oResult.aValues.push(values[0]);

        params = params.slice(0, -2);

        oResult.sql = `update "${sTableName}" set ${params} where "${keys[0]}" = ?`; 

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };

    this.createPreparedDelete = function (sTableName, oValueObject) {

        let sWhereClause = '';

        Object.keys(oValueObject).forEach(key => {
            sWhereClause += `"${key}" = ? and `;
            oResult.aParams.push(key);
        });

        Object.values(oValueObject).forEach(value => {
            oResult.aValues.push(value);
        });

        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = "where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };
};

