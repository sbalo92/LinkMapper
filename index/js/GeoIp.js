var giTemp;
(() => {
    //This is done to allow usage in both nodeJs and on the client browser
    const BC = typeof BaseClass !== "undefined" ?
        BaseClass : require("./BaseClass.js");


    class GeoIpClass extends BC {


        static get GEOIP_URL() {
            return "https://freegeoip.net"

        }
        static set GEOIP_URL(v) {}
        static locate(ipAddress, onSuccess, onFailure) {
            if (typeof onSuccess !== "function") {
                return;
            }
            const HR = typeof HttpRequest !== "undefined" ?
                HttpRequest : require("./HttpRequest.js");
            console.log("locate", ipAddress);
            const geoIpRequest = GeoIpClass.GEOIP_URL + "/json/" +
                ipAddress;
            HR.get(geoIpRequest, onSuccess, onFailure);
        }

    }
    giTemp = GeoIpClass;
})();
const GeoIp = (() => {
    return giTemp;
})();
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeoIp;
}
console.log("GeoIp Loaded");
