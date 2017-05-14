(() => {
    const leafMap = new LeafMap({
        mapDiv: "mm"
    });
    // let geoPromise = new Promise((resolve, reject) => {
    //     HttpRequest.get(window.location.origin + "/testGeo",
    //         (response) => {
    //             // console.log(response);
    //             resolve(response);
    //         },
    //         (response) => {
    //             console.log(response);
    //             reject(response);
    //         }
    //     );
    // });
    // geoPromise.then(
    //     (geo) => {
    //         console.log(geo);
    //         leafMap.addGeoJson(JSON.parse(geo));
    //     },
    //     (failure) => {
    //         console.log(failure);
    //     }
    // );
    // HttpRequest.post(window.location.origin + "/location", { test: "data" }, (response) => {
    //     console.log(response);
    // },
    //     (response) => {
    //         console.log("fail", response);
    //     });
    // navigator.geolocation.getCurrentPosition((geoposition) => {
    //     const payload = {
    //         lng: geoposition.coords.longitude,
    //         lat: geoposition.coords.latitude
    //     };

    // if (typeof geoposition.coords.latitude === "undefined" ||
    //     typeof geoposition.coords.longitude === "undefined") {
    //     return;
    // }


    //     console.log("location payload", payload)
    //     HttpRequest.post(window.location.origin + "/location",
    //         payload, (
    //             response) => {
    //             console.log("succeess ", response);
    //             const processed = JSON.parse(response);
    //             console.log(processed);
    //             const markers = []
    //             const geoMarker = leafMap.addGeoJson(leafMap.getGeoJson(
    //                 processed
    //                 .geoLocation
    //                 .lat, processed.geoLocation.lng));
    //             if (typeof processed.ipLocation === "undefined") {
    //                 console.log("no ip location");
    //                 return;
    //             }
    //             const ipMarker = leafMap.addGeoJson(leafMap.getGeoJson(
    //                 processed
    //                 .ipLocation.lat, processed.ipLocation
    //                 .lng));
    //             leafMap.fitToMapObjects(geoMarker, ipMarker);
    //         }, (response) => {
    //             console.log("failure ", response);
    //         });
    //     // this._map.setView(new L.LatLng(geoposition.coords.latitude, geoposition.coords.longitude), 9);
    // });



    class LocationPromise extends BaseClass {
        constructor(p) {
            //  params = {onLocated:
            //                      function(LocationPackage =
            //                                          {htmlLat,htmlLng,ipLat,ipLng,htmlRaw,ipRaw})}
            super(p);
            if (typeof p.onLocated !== "function") {
                return;
            }
            const that = this;
            const ipPromise = LocationPromise.IpLocationPromise;
            const htmlPromise = LocationPromise.HtmlLocationPromise;
            this.locationPackage = {};
            Promise.all([
                ipPromise,
                htmlPromise
            ]).then(
                (resultArr) => {
                    const ipRaw = JSON.parse(resultArr[0]);
                    const htmlRaw = resultArr[1];
                    const locationPackage = {
                        ipRaw: ipRaw,
                        htmlRaw: htmlRaw,
                        coords: {
                            htmlLng: htmlRaw.coords.longitude,
                            htmlLat: htmlRaw.coords.latitude,
                            ipLng: ipRaw.longitude,
                            ipLat: ipRaw.latitude
                        }

                    };
                    that._onLocated(locationPackage);
                }
            );
        }
        static set IpLocationPromise(v) {}
        static get IpLocationPromise() {
            return new Promise(
                (resolve, reject) => {
                    GeoIp.locate("", (success) => {
                        resolve(success);
                    }, (fail) => {
                        reject(fail);
                    });
                });
        }
        static set HtmlLocationPromise(v) {}
        static get HtmlLocationPromise() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((
                    geoposition) => {
                    resolve(geoposition);
                });
            });
        }
    }

    const locationPromise = new LocationPromise({
        onLocated: (locationPackage) => {
            const geoMarker = leafMap.addGeoJson(
                leafMap.getGeoJson(
                    locationPackage.coords.htmlLat,
                    locationPackage.coords.htmlLng),
                "<b>HTML Location<b>");
            let ipMarker = leafMap.addGeoJson(
                leafMap.getGeoJson(locationPackage.coords.ipLat,
                    locationPackage.coords.ipLng),
                "<b>IP Location<b>");
            leafMap.fitToMapObjects(geoMarker, ipMarker);
            // console.log("beofre send", locationPackage.coords);
            HttpRequest.post(
                window.location.origin + "/location",
                locationPackage.coords, (response) => {
                    // console.log("success ", response);
                    const processed = JSON.parse(response);
                    if (typeof ipMarker === "undefined") {
                        ipMarker = leafMap.addGeoJson(
                            leafMap.getGeoJson(processed.ipLat,
                                processed.ipLng),
                            "<b>IP Location<b>");
                        leafMap.fitToMapObjects(geoMarker, ipMarker);
                    }
                    // console.log(processed);

                }, (response) => {
                    // console.log("failure ", response);
                });
        }
    });



})();
