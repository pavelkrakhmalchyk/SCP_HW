sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("carshops.controller.carshop.Carshops", {
        onInit: function () {
        },

        onUpdateFinished: function(oEvent) {
            var oList = oEvent.getSource();

            if (oList.getSelectedItem() === null) {
                this._selectNewCarshop(0);
            }
        },
        
        onSelectionChange: function(oEvent) {
			var sShopId = oEvent.getSource().getSelectedItem().getBindingContext("odata").getProperty("shopid");
			this.getOwnerComponent().getRouter()
				.navTo("carshopsDetails",
					{shopid:sShopId});
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

            var selItem = this.getView().byId("carshops").getSelectedItem();
            var sShopId = selItem.getBindingContext("odata").getProperty("shopid");

            $.ajax({
                url: 'https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/carshop/carShop.xsjs?shopid=' + sShopId,
                type: 'DELETE',
				success: function(result) {
                    that.getView().getModel("odata").refresh();
                    var newSelCarshop = that._getSelectedCarshopIndex() - 1;

                    if (newSelCarshop < 0){
                        newSelCarshop += 2;
                    }

                    that.getView().getModel("odata").refresh();
                    that._selectNewCarshop(newSelCarshop);
				}
            });
        },

        _selectNewCarshop: function(index){
            var oList = this.getView().byId("carshops");
            var items = oList.getItems();

            if (items && items.length > 0) {
                if (index < 0){
                    index = 0;
                }

                var newItemNumber = items[index].getBindingContext("odata").getProperty("shopid");
        
                oList.setSelectedItem(items[index], true);

                this.getOwnerComponent().getRouter()
				.navTo("carshopsDetails",
					{shopid: newItemNumber});
            }
        },

        _getSelectedCarshopIndex: function(){
            var oList = this.getView().byId("carshops");
            var items = oList.getItems();

            var selItem = oList.getSelectedItem();
            return items.indexOf(selItem);
        }
    });
});