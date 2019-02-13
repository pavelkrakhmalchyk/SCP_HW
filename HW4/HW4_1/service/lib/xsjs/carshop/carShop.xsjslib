const StatementCreator = $.import('xsjs.statement', 'statementCreator').statementCreator;
const statementCreator = new StatementCreator();

var carShop = function (connection) {

    const CARSHOP_TABLE = "HiMTA::CarShop";
    const SEQ_NAME = "HiMTA::shopid";

    this.doGet = function(){
        const statement = `select * from "${CARSHOP_TABLE}"`;
        const result = connection.executeQuery(statement);
        
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    }

    this.doPost = function (oCarShop) {
        oCarShop.shopid = getNextValue(SEQ_NAME);

        const statement = statementCreator.createInsertStatement(CARSHOP_TABLE, oCarShop);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCarShop));
    };


    this.doPut = function (oCarShop) {
        const statement = statementCreator.createUpdateStatement(CARSHOP_TABLE, oCarShop);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCarShop));
    };


    this.doDelete = function (shopid) {
        const statement = statementCreator.createDeleteStatement(CARSHOP_TABLE, {shopid: shopid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextValue (sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }
};
