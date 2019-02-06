var user = function (connection) {

    const USER_TABLE = "HiMTA_Lect3::User";

    this.doGet = function(){
        const statement = 'select * from "HiMTA_Lect3::User"';
        const result = connection.executeQuery(statement);
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }

    this.doPost = function (oUser) {
        oUser.usid = getNextval("HiMTA_Lect3::usid");

        //generate query
        const statement = createPreparedInsertStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        const statement = createPreparedUpdateStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doDelete = function (oUser) {
        const statement = createPreparedDeleteStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

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

    function createPreparedUpdateStatement(sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let params = '';

        for (var i = 1; i < Object.keys(oValueObject).length; i++){
            oResult.aParams.push(Object.keys(oValueObject)[i]);
            params += `"${Object.keys(oValueObject)[i]}" = ?, `;
        }

        for (var i = 1; i < Object.values(oValueObject).length; i++){
            oResult.aValues.push(Object.values(oValueObject)[i]);
        }

        params = params.slice(0, -2);

        oResult.sql = `update "${sTableName}" set ${params} where "${Object.keys(oValueObject)[0]}" = '${Object.values(oValueObject)[0]}'`; 

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

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
