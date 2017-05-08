
(() => {
    const leafMap = new LeafMap({ mapDiv: "mm" });
    let geoPromise = new Promise((resolve, reject) => {
        HttpRequest.HttpGet(window.location.origin + "/testGeo",
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
})();
