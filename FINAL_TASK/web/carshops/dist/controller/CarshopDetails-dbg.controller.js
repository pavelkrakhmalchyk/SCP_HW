sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "carshops/model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, formatter, JSONModel) {
	"use strict";

	return Controller.extend("carshops.controller.CarshopDetails", {
        formatter: formatter,

        onInit : function () {
            this.getOwnerComponent().getRouter().getRoute("carshopsDetails").attachPatternMatched(this._onRouteMatched, this);

            var oEditModeModel = new JSONModel({
                cars: {
                    "enabled": "false"
                }
            });
            this.getView().setModel(oEditModeModel, "editMode");

            this.oTable = this.getView().byId("carsTable");
            this.oReadOnlyTemplate = this.getView().byId("columnListItem");
            this.oEditableTemplate = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Input({
						value: "{odata>name}"
					}), new sap.m.Input({
						value: "{odata>model}"
					}), new sap.m.Input({
						value: "{odata>color}"
					}), new sap.m.Text({
						text: "{odata>create_time}"
					}), new sap.m.Text({
						text: "{odata>update_time}"
					})
				]
            });
        },
        
        _onRouteMatched: function(oEvent) {
            this.carShopId = oEvent.getParameter("arguments").shopid;

            this.getView().bindElement({
                path: "/CarShops('" + this.carShopId + "')",
                model: "odata",
                parameters: {
                    expand: 'toCars,toAddress'
                 }
            });
        },
        
        rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "toCars",
                template: oTemplate,
                model: "odata"
			}).setKeyboardMode(sKeyboardMode);
        },
        
        onEditCars: function() {
            this._onOffEditMode("cars", true);
            this.rebindTable(this.oEditableTemplate, "Edit");
        },
        
        onSaveCars: function() {
            this._onOffEditMode("cars", false);
            this.getView().getModel("odata").submitChanges();
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
        },

        onCancelCars: function() {
            this._onOffEditMode("cars", false);
            this.getView().getModel("odata").resetChanges();
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
        },

        onAddCar: function() {
            this.getOwnerComponent().getRouter()
				.navTo("addCar",
					{shopid: this.carShopId});
        },

        onDeleteCar: function(oEvent) {
            var that = this;
            var carId = oEvent.getParameter('listItem').getBindingContext("odata").getProperty("crid");

            $.ajax({
                url: 'https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/car/car.xsjs?crid=' + carId,
                type: 'DELETE',
                success: function(result) {
                    that.getView().getModel("odata").refresh();
                }
            });
        },

        _onOffEditMode: function(sEssence, enable){
            var oEditModeModel = this.getView().getModel("editMode");

            if (enable === true){
                oEditModeModel.setProperty("/" + sEssence + "/enabled", "true");
            }
            else if (enable === false){
                oEditModeModel.setProperty("/" + sEssence + "/enabled", "false");
            }
        }

    });
});