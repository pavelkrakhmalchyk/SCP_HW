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

			var oCarshopModel = new JSONModel({
				shopid: 0,
				name: ""
			});

			this.getView().setModel(oCarshopModel, "carshopModel");
        },
        
		_onRouteMatched: function(oEvent) {
			var carShopId = oEvent.getParameter("arguments").shopid;

            this.getView().bindElement({
                path: "/CarShops('" + carShopId + "')",
				model: "odata"
			});

			var name = this.getView().getBindingContext("odata").getProperty("name");

			this.getView().getModel("carshopModel").setProperty("/shopid", carShopId);
			this.getView().getModel("carshopModel").setProperty("/name", name);
        },

        onSaveCarShop: function () {
			var that = this;
			var carShop = this.getView().getModel("carshopModel").oData

			if (carShop.name != ""){
				var jsonData = JSON.stringify(carShop);

				$.ajax({
					type: "PUT",
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