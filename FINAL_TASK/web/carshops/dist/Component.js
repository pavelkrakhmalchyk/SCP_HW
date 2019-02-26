sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, JSONModel) {
	"use strict";

	return UIComponent.extend("carshops.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
		}
	});
});