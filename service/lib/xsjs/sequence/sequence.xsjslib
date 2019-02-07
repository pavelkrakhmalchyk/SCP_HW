var sequence = function (connection) {

    this.getNextValue = function (sSeqName) {
            const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
            const result = connection.executeQuery(statement);

            if (result.length > 0) {
                return result[0].ID;
            } else {
                throw new Error('ID was not generated');
            }
        }
}