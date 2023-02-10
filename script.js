window.onload = () => {
    //let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    let lastEntity;

    const _latitude = 35.263;
    const _longitude = 129.0836;

    
    el.addEventListener("gps-camera-update-position", e => {
        

        
        // 거리
        const dist = getDistanceFromLatLonInKm(_latitude, _longitude, e.detail.position.latitude,e.detail.position.longitude);

        
        
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

        if(dist > 1){
            _scale = 120;
            textScale = 600;
        }else if(dist > 0.9){
            _scale = 110;
            textScale = 550;
        }else if(dist > 0.8){
            _scale = 100;
            textScale = 500;
        }else if(dist > 0.7){
            _scale = 90;
            textScale = 450;
        }else if(dist > 0.6){
            _scale = 80;
            textScale = 400;
        }else if(dist > 0.5){
            _scale = 70;
            textScale = 350;
        }else if(dist > 0.4){
            _scale = 60;
            textScale = 300;
        }else if(dist > 0.3){
            _scale = 50;
            textScale = 250;
        }else if(dist > 0.2){
            _scale = 40;
            textScale = 200;
        }else if(dist > 0.1){
            _scale = 30;
            textScale = 150;
        }else{
            _scale = 20;
            textScale = 100;
        }

        box.setAttribute("scale", {
            x: _scale,
            y: _scale,
            z: _scale
        });
        box.setAttribute('material', { color: 'red' } );
        box.setAttribute("position", {
            x : 0,
            y : 15,
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

        alert(_txt);
        
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
