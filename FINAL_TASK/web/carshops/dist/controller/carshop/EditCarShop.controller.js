sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("carshops.controller.carshop.EditCarShop", {
        onInit : function () {
			this.getOwnerComponent().getRouter().getRoute("editCarShop").attachPatternMatched(this._onRouteMatched, this);
        },
        
		_onRouteMatched: function(oEvent) {
			var carShopId = oEvent.getParameter("arguments").shopid;

            this.getView().bindElement({
                path: "/CarShops('" + carShopId + "')",
				model: "odata"
			});
        },

        onSaveCarShop: function () {
			var that = this;
			var oModel = this.getView().getBindingContext("odata");
			
			var oCarshop = {};
            oCarshop.shopid = oModel.getProperty("shopid");
            oCarshop.name = oModel.getProperty("name");

			if (oCarshop.name != ""){
				var jsonData = JSON.stringify(oCarshop);

				$.ajax({
					type: "PUT",
					crossDomain: true,
					url: "https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/carshop/carshop.xsjs",
					headers: {
						"content-type": "application/json"
					},
					data: jsonData,
					success: function(result) {
						that.onNavBack();
						that.getView().getModel("odata").refresh();
					}
				});
			} else {
				MessageToast.show("Fill all fields, please");	
			}	
		},

		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("carshops", {}, true);
			}
		}
    });
});