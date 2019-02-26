sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("carshops.controller.car.AddCar", {
        onInit : function () {
            this.getOwnerComponent().getRouter().getRoute("addCar").attachPatternMatched(this._onRouteMatched, this);

			var oCarModel = new JSONModel({
				shopid: 0,
                name: "",
                model: "",
                color: ""
			});

			this.getView().setModel(oCarModel, "carModel");
        },

        _onRouteMatched: function(oEvent) {
            var carShopId = oEvent.getParameter("arguments").shopid;
            this.getView().getModel("carModel").setProperty("/shopid", carShopId);
        },

        onCreateCar: function () {
            var that = this;
            var car = this.getView().getModel("carModel").oData;

            if (car.name != "" && car.model != "" && car.color != ""){
                var jsonData = JSON.stringify(car);

                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: "https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/car/car.xsjs",
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