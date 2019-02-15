jQuery.sap.registerPreloadedModules({version:"2.0",name:"carshop_display/Component-preload",modules:{"carshop_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device"],function(t,i){"use strict";return t.extend("carshop_display.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments)}})});',"carshop_display/controller/App.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("carshop_display.controller.App",{})});',"carshop_display/view/App.view.xml":'<mvc:View\r\ncontrollerName="carshop_display.controller.App"\r\n\txmlns="sap.m"\r\n    displayBlock="true"\r\n\txmlns:mvc="sap.ui.core.mvc"><App class="sapUiSizeCompact" id="carshop_display"><pages><Page title="Car shops"><content><Table\r\n                            id="CarShopsList"\r\n                            items="{\r\n                                path: \'odata>/CarShops\'\r\n                            }"><columns><Column><Text text="ID"/></Column><Column><Text text="Name"/></Column></columns><items><ColumnListItem><cells><Text text="{odata>shopid}"/></cells><cells><Text text="{odata>name}"/></cells></ColumnListItem></items></Table></content></Page></pages></App></mvc:View>',"carshop_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"carshop_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://p2001081147trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"carshop_display.view.App","type":"XML"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{},"sap.ushell":{},"sap.collaboration":{},"sap.ui.comp":{},"sap.uxap":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"odata":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}},"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"carshop_display.i18n.i18n"}}}}}'}});