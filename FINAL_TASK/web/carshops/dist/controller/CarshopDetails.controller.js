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

        onEditAddressPress: function() {
            this.getOwnerComponent().getRouter()
				.navTo("editAddress",
					{shopid: this.carShopId});
        },
        
        onEditCars: function() {
            this._onOffEditMode("cars", true);
            this._rebindTable(this.oEditableTemplate, "Edit");
        },
        
        onSaveCars: function() {
            this._onOffEditMode("cars", false);
            this.getView().getModel("odata").submitChanges();
            this._rebindTable(this.oReadOnlyTemplate, "Navigation");
        },

        onCancelCars: function() {
            this._onOffEditMode("cars", false);
            this.getView().getModel("odata").resetChanges();
            this._rebindTable(this.oReadOnlyTemplate, "Navigation");
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

        _rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "toCars",
                template: oTemplate,
                model: "odata"
			}).setKeyboardMode(sKeyboardMode);
        },

        _onOffEditMode: function(sEssence, enable){
            var oEditModeModel = this.getView().getModel("config");

            if (enable === true){
                oEditModeModel.setProperty("/editMode/" + sEssence + "/enabled", true);
            }
            else if (enable === false){
                oEditModeModel.setProperty("/editMode/" + sEssence + "/enabled", false);
            }
        }

    });
});