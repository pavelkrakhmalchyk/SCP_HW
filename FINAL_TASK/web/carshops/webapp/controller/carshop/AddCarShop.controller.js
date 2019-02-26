sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("carshops.controller.carshop.AddCarShop", {
        onInit: function () {

			var oCarshopModel = new JSONModel({
				name: "New carshop"
			});

			this.getView().setModel(oCarshopModel, "carshopModel");
		},

        onCreateCarShop: function () {
			var that = this;
			var carShop = this.getView().getModel("carshopModel").oData;

			if (carShop.name != ""){
				var jsonData = JSON.stringify(carShop);

				$.ajax({
					type: "POST",
					crossDomain: true,
					url: "https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/carshop/carShop.xsjs",
					headers: {
						"content-type": "application/json"
					},
					data: jsonData,
					success: function(result) {
						that.onNavBack();
						that.getView().getModel("odata").refresh();
					}
				});
			}else {
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