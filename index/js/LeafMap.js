class LeafMap extends BaseClass {
    /**
     * params {mapDiv= id of map (String)}
     */
    constructor(params) {
        super(params);
        this._map = L.map(this._mapDiv);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(this._map);
        this._map.setView(new L.LatLng(51.3, 0.7), 9);
        this.centreToUser();
    }
    centreToUser() {
        navigator.geolocation.getCurrentPosition((geoposition) => {
            if (typeof geoposition.coords.latitude === "undefined" ||
                typeof geoposition.coords.longitude === "undefined"
            ) {
                return;
            }
            this._map.setView(new L.LatLng(geoposition.coords.latitude,
                geoposition.coords.longitude), 9);
        });

    }
    addGeoJson(geoJson) {
        if (typeof geoJson === "undefined" || geoJson === null) {
            return;
        }
        const mapObject = L.geoJSON(geoJson);
        mapObject.addTo(this._map);
        return mapObject;
    }
    fitToMapObjects() {
        const geoArray = [];
        for (let i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] !== "undefined" && arguments[i] !==
                null) {
                geoArray.push(arguments[i]);
            }
        }
        if (geoArray.length > 0) {
            const group = new L.featureGroup(geoArray);
            this._map.fitBounds(group.getBounds());
        }
    }
    getGeoJson(lat, lng) {
        if (typeof lat !== "number" || typeof lng !== "number") {
            return undefined;
        }
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lng, lat]
            }
        }
    }



}
