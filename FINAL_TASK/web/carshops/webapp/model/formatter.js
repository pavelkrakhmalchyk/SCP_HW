sap.ui.define(function () {
    "use strict";

    return {
        booleanReverse: function(stringBoolean){
            return stringBoolean === false;
        },

        removetime :  function (value) {
            if (value) {
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "MM-dd-yyyy hh:mm a"});
                return oDateFormat.format(new Date(value));
            } else {
                return value;
            }
        }
    };
});