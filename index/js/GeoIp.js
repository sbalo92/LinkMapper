var temp;
(() => {
    //This is done to allow usage in both nodeJs and on the client browser
    let BC = typeof BaseClass !== "undefined" ?
        BaseClass : require("./BaseClass.js");


    class GeoIpClass extends BC {

        constructor(params) {
            super(params);
        }
        static get GEOIP_URL() {
            return "https://freegeoip.net"

        }
        static set GEOIP_URL(v) {}
        static locate(ipAddress) {
            //TODO:
            console.log("locate", ipAddress);
        }
    }
    temp = GeoIpClass;
})();
const GeoIp = (() => {
    return temp;
})();
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeoIp;
}
console.log("GeoIp Loaded");
