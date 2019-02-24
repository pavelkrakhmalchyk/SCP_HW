sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("carshops.controller.EditCarShop", {
        onInit : function () {
            this.getOwnerComponent().getRouter().getRoute("carshopsDetails").attachPatternMatched(this._onRouteMatched, this);
        },
        
		_onRouteMatched: function(oEvent) {
            var carShopId = oEvent.getParameter("arguments").shopid;

            this.getView().bindElement({
                path: "/CarShops('" + carShopId + "')",
                model: "odata"
            });
        },

        save: function () {
            var that = this;

            var carShop = {};
			carShop.name = this.getView().byId("input_name").getValue();

			var jsonData = JSON.stringify(carShop);

            $.ajax({
                type: "PUT",
				crossDomain: true,
				url: "https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata" + this.getView().getBindingContext("odata").sPath,
				headers: {
					"content-type": "application/json"
				},
				data: jsonData,
				success: function(result) {
                    that.onNavBack();
				}
			  });

			this.getView().getModel("odata").refresh();
		},

		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				// There is no history!
				// Naviate to master page
				this.getOwnerComponent().getRouter().navTo("carshops", {}, true);
			}
		}
    });
});