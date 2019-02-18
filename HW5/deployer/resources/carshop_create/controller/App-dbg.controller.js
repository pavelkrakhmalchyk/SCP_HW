sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
	"use strict";

	return Controller.extend("carshop_create.controller.App", {
        onInit: function () {

		},

        createCarShop: function () {
            var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();

            $.ajax({
                type: "POST",
				crossDomain: true,
				url: "https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/CarShops",
				headers: {
					"content-type": "application/json"
				},
				data: "{\"name\": \"" + Name  + "\"}"
              });
		}
    });
});