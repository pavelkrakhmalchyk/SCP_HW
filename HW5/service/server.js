"use strict";

var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port  = process.env.PORT || 3000;

var options = {
  	// anonymous : true,
    redirectUrl : "/index.xsjs"
};

// configure HANA
try {
    options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
    console.log("[ERROR]", err.message);
}

try {
    options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
    console.log("[ERROR]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);