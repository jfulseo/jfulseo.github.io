window.onload = () => {

    const el = document.querySelector("[gps-new-camera]");

    let lastEntity;


    //const _latitude = getParameterByName("lat");
    //const _longitude = getParameterByName("lng");

    const _latitude = 35.2676;
    const _longitude = 129.0859;

    
    el.addEventListener("gps-camera-update-position", e => {
        

        // 거리
        var dist = 0;
        try {
            dist = getDistanceFromLatLonInKm(_latitude, _longitude, e.detail.position.latitude,e.detail.position.longitude);
        } catch (error) {
            console.error(error);
        }
        
        if(lastEntity){
            document.querySelector("a-scene").removeChild(lastEntity);        
        }

        const compoundEntity = document.createElement("a-entity");
        compoundEntity.setAttribute('gps-new-entity-place', {
            latitude: _latitude,
            longitude: _longitude
        });

        const box = document.createElement("a-box");

        let _scale = 100;
        let textScale = 600;
        let _p = 20;

        if(dist > 1){
            _scale = 100;
            _p = 100;
            textScale = 600;
        }else if(dist > 0.9){
            _scale = 91;
            _p = 91;
            textScale = 549;
        }else if(dist > 0.8){
            _scale = 82;
            _p = 82;
            textScale = 498;
        }else if(dist > 0.7){
            _scale = 73;
            _p = 73;
            textScale = 447;
        }else if(dist > 0.6){
            _scale = 64;
            _p = 64;
            textScale = 396;
        }else if(dist > 0.5){
            _scale = 55;
            _p = 55;
            textScale = 345;
        }else if(dist > 0.4){
            _scale = 46;
            _p = 46;
            textScale = 294;
        }else if(dist > 0.3){
            _scale = 37;
            _p = 37;
            textScale = 243;
        }else if(dist > 0.2){
            _scale = 28;
            _p = 28;
            textScale = 192;
        }else if(dist > 0.1){
            _scale = 19;
            _p = 19;
            textScale = 141;
        }else{
            _scale = 10;
            _p = 10;
            textScale = 90;
        }

        box.setAttribute("scale", {
            x: _scale,
            y: _scale,
            z: _scale
        });
        box.setAttribute('material', { color: 'red' } );
        box.setAttribute("position", {
            x : 0,
            y : _p,
            z: 0
        } );

        const text = document.createElement("a-text");

        text.setAttribute("look-at", "[gps-new-camera]");
        text.setAttribute("scale", {
            x: textScale,
            y: textScale,
            z: textScale
        });

        let _txt = dist.toFixed(2);

        if(dist > 1){
            _txt = dist.toFixed(2) + 'km';
        }else{
            _txt = dist.toFixed(3)*1000 + 'm';
        }
        
        text.setAttribute("value", _txt);
        text.setAttribute("align", "center");
        compoundEntity.appendChild(box);
        compoundEntity.appendChild(text);
        document.querySelector("a-scene").appendChild(compoundEntity);            
        lastEntity = compoundEntity;
            
    });
};


function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
