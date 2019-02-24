sap.ui.define(function () {
    "use strict";

    return {
        stringToBoolean: function(stringBoolean){
            return stringBoolean === "true";
        },

        stringToBooleanReverse: function(stringBoolean){
            return stringBoolean === "false";
        },
    };
});