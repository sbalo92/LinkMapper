var hrTemp;
(() => {

    const XR = typeof XMLHttpRequest !== "undefined" ? XMLHttpRequest :
        require("xmlhttprequest").XMLHttpRequest;

    class HttpRequestClass {
        constructor() {};
        static HttpRequest(url, onSuccess, onFailure) {
            const xmlHttp = new XR();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status ==
                    200) {
                    if (typeof onSuccess === "function") {
                        onSuccess(xmlHttp.responseText);
                    }
                } else if (xmlHttp.readyState == 4) {
                    if (typeof onFailure === "function") {
                        onFailure(xmlHttp.responseText);
                    }
                }
            }
            return xmlHttp;
        }
        static get(url, onSuccess, onFailure) {
            const xmlHttp = HttpRequest.HttpRequest(url, onSuccess,
                onFailure);
            xmlHttp.open("GET", url, true); // true for asynchronous
            xmlHttp.send(null);
        }
        static post(url, data, onSuccess, onFailure) {
            const xmlHttp = HttpRequest.HttpRequest(url, onSuccess,
                onFailure);
            xmlHttp.open("POST", url, true); // true for asynchronous
            xmlHttp.setRequestHeader("Content-type", "application/json");
            let strData = JSON.stringify(data);
            console.log("posting this", strData);
            xmlHttp.send(strData);
        }
    }
    hrTemp = HttpRequestClass;
})();
const HttpRequest = (() => {
    return hrTemp;
})();
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HttpRequest;
}
console.log("HttpRequest loaded");
