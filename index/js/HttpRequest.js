class HttpRequest {
    constructor() { };
    static HttpGet(url, onSuccess, onFailure) {
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
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    }
}
