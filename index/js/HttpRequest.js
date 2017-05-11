class HttpRequest {
    constructor() { };
    static HttpRequest(url,onSuccess, onFailure){
         const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                if (typeof onFailure === "function") {
                    onSuccess(JSON.parse(xmlHttp.responseText));
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
        const xmlHttp =HttpRequest.HttpRequest(url,onSuccess,onFailure);
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    static post(url, json,onSuccess,onFailure){
        const xmlHttp =HttpRequest.HttpRequest(url,onSuccess,onFailure);
        xmlHttp.open("POST", url, true); // true for asynchronous 
        xmlHttp.send(JSON.stringofy(json));
    }
}
