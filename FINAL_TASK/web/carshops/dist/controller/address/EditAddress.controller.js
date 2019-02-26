sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("carshops.controller.address.EditAddress", {
        onInit : function () {
            this.getOwnerComponent().getRouter().getRoute("editAddress").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            var carShopId = oEvent.getParameter("arguments").shopid;

            this.getView().bindElement({
                path: "/CarShops('" + carShopId + "')/toAddress",
				model: "odata"
			});
        },

        onSaveAddress: function () {
            var that = this;
            var oModel = this.getView().getBindingContext("odata");
            
            var oAddress = {};
            oAddress.adrid = oModel.getProperty("adrid");
            oAddress.shopid = oModel.getProperty("shopid");
            oAddress.city = oModel.getProperty("city");
            oAddress.strt = oModel.getProperty("strt");
            oAddress.hnum = oModel.getProperty("hnum");

            if (oAddress.city != "" && oAddress.strt != "" && oAddress.hnum != ""){
                var jsonData = JSON.stringify(oAddress);

                $.ajax({
                    type: "PUT",
                    crossDomain: true,
                    url: "https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/address/address.xsjs",
                    headers: {
                        "content-type": "application/json"
                    },
                    data: jsonData,
                    success: function(result) {
                        that.getView().getModel("odata").refresh();
                        that.onNavBack();
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