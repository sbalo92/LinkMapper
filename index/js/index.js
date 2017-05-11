
(() => {
    const leafMap = new LeafMap({ mapDiv: "mm" });
    let geoPromise = new Promise((resolve, reject) => {
        HttpRequest.get(window.location.origin + "/testGeo",
            (response) => {
                // console.log(response);
                resolve(response);
            },
            (response) => {
                console.log(response);
                reject(response);
            }
        );
    });
    geoPromise.then(
        (geo) => {
            console.log(geo);
            leafMap.addGeoJson(geo);
        },
        (failure) => {
            console.log(failure);
        }
    );

    navigator.geolocation.getCurrentPosition((geoposition) => {
        if (typeof geoposition.coords.latitude === "undefined" ||
            typeof geoposition.coords.longitude === "undefined") {
            return;
        }
        HttpRequest.post(window.location.origin+"/location",geoposition.coords,(response)=>{
            console.log("succeess ", response);
        },
        (response)=>{
            console.log("failure ",response);
        });
        // this._map.setView(new L.LatLng(geoposition.coords.latitude, geoposition.coords.longitude), 9);
    });
})();
