sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("carshops.controller.carshop.Carshops", {
        onInit: function () {
        },

        onUpdateFinished: function(oEvent) {
            var oList = oEvent.getSource();
            this._goToFirstCarshop(oList);
        },
        
        onSelectionChange: function(oEvent) {
			var sShopId = oEvent.getSource().getSelectedItem().getBindingContext("odata").getProperty("shopid");
			this.getOwnerComponent().getRouter()
				.navTo("carshopsDetails",
					{shopid: sShopId});
        },
        
        onAddCarShopPress: function(oEvent) {
			this.getOwnerComponent().getRouter()
				.navTo("addCarShop");
        },

        onEditCarShopPress: function(oEvent) {
            var sShopId = this.getView().byId("carshops").getSelectedItem().getBindingContext("odata").getProperty("shopid");
			this.getOwnerComponent().getRouter()
				.navTo("editCarShop",
                    {shopid:sShopId});
        },

        onDeleteCarShopPress: function(oEvent) {
            var that = this;

            var oList = this.getView().byId("carshops");
            var sShopId = oList.getSelectedItem().getBindingContext("odata").getProperty("shopid");

            this.getView().getModel("odata").remove("/CarShops('"+ sShopId +"')", {
                method: "DELETE",
                success: function(data) {
                    that._goToFirstCarshop(oList);
                }
            });
        },

        _goToFirstCarshop: function(oList){
            var items = oList.getItems();

            if (oList.getSelectedItem() === null) {
                oList.setSelectedItem(items[0], true);

                var sShopId = items[0].getBindingContext("odata").getProperty("shopid");
                this.getOwnerComponent().getRouter()
                .navTo("carshopsDetails",
                    {shopid: sShopId});
            }
        }
    });
});