const CarShopLib = $.import('xsjs.carshop', 'carShop').carShop;
const carShopLib = new CarShopLib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET : {
                    carShopLib.doGet();
                    break
                }
                case $.net.http.PUT : {
                    carShopLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                    carShopLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
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