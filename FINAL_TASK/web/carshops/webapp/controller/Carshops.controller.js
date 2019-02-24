sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("carshops.controller.Carshops", {
        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("carshops").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            this.getOwnerComponent().getRouter()
                .navTo("carshopsDetails", {shopid: "0001"}, true);
        },

        onUpdateFinished: function(oEvent) {
            var oList = oEvent.getSource();

            if (oList.getSelectedItem() === null) {
                var items = oList.getItems();
          
                if (items && items.length > 0) {
                    oList.setSelectedItem(items[0], true);
                }
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
				.navTo("addNewCarShop");
        },

        onEditCarShopPress: function(oEvent) {
            var sShopId = this.getView().byId("carshops").getSelectedItem().getBindingContext("odata").getProperty("shopid");
			this.getOwnerComponent().getRouter()
				.navTo("editCarShop",
                    {shopid:sShopId});
        },

        onDeleteCarShopPress: function(oEvent) {
            this.getOwnerComponent().getRouter()
				.navTo("carshopsDetails",
                    {shopid: "0001"});

            var selItem = this.getView().byId("carshops").getSelectedItem();
            var sShopId = selItem.getBindingContext("odata").getProperty("shopid");

            $.ajax({
                url: 'https://p2001081147trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/carshop/carShop.xsjs?shopid=' + sShopId,
                type: 'DELETE'
            });

            var oModel = this.getView().byId("carshops").getModel("odata");
            console.log(oModel);
            oModel.read();
            console.log(oModel);
            this._selectFirstListItem();
        },

        _selectFirstListItem: function(){
            var oList = this.getView().byId("carshops");
            var items = oList.getItems();
    
            if (items && items.length > 0) {
                oList.setSelectedItem(items[0], true);
            }
        }
    });
});