const CarShopLib = $.import('xsjs.carshop', 'carShop').carShop;
const carShopLib = new CarShopLib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET : {
                    /*
                        if(!$.session.hasAppPrivilege("view")) {
                            $.response.status = $.net.http.UNAUTHORIZATED;
                            $.response.setBody(e.message);
                            return;
                        }
                    */
                    carShopLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    /*
                        if(!$.session.hasAppPrivilege("create")) {
                            $.response.status = $.net.http.UNAUTHORIZATED;
                            $.response.setBody(e.message);
                            return;
                        }
                    */
                    carShopLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    /*
                        if(!$.session.hasAppPrivilege("create")) {
                            $.response.status = $.net.http.UNAUTHORIZATED;
                            $.response.setBody(e.message);
                            return;
                        }
                    */
                    carShopLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    /*
                        if(!$.session.hasAppPrivilege("create")) {
                            $.response.status = $.net.http.UNAUTHORIZATED;
                            $.response.setBody(e.message);
                            return;
                        }
                    */
                    carShopLib.doDelete($.request.parameters.get("shopid"));
                    break;
                }
                default: {
                    $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());