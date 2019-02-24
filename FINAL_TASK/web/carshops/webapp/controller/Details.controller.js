sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "carshops/model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, formatter, JSONModel) {
	"use strict";

	return Controller.extend("carshops.controller.Details", {
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
					})
				]
            });
        },
        
        _onRouteMatched: function(oEvent) {
            var carShopId = oEvent.getParameter("arguments").shopid;

            this.getView().bindElement({
                path: "/CarShops('" + carShopId + "')",
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
        
        rebindForm: function(oTemplate) {
			this.oCarshopInfoPanel.bindElement({
				path: "",
                template: oTemplate,
                model: "odata"
			})
        },

        onEditAddressPress: function() {
            this._onOffEditMode("address", true);
        },
        
        onEditCarsPress: function() {
            this._onOffEditMode("cars", true);
            this.rebindTable(this.oEditableTemplate, "Edit");
        },
        
        onSaveCars: function() {
            this._onOffEditMode("cars", false);
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
        },

        onCancelCars: function() {
            this._onOffEditMode("cars", false);
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
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