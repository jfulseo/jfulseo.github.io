window.onload = () => {
    //let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    let lastEntity;
    
    el.addEventListener("gps-camera-update-position", e => {
        
        const dist = getDistanceFromLatLonInKm(35.2664,129.0931,e.detail.position.latitude,e.detail.position.longitude);
        
        
        //alert(dist);

        //console.log(e);
        
        //if(!testEntityAdded) {

            // Add a box to the north of the initial GPS position
            //const entity = document.createElement("a-box");
                if(lastEntity){
                    document.querySelector("a-scene").removeChild(lastEntity);        
                }
        
                const compoundEntity = document.createElement("a-entity");
                compoundEntity.setAttribute('gps-new-entity-place', {
                    latitude: e.detail.position.latitude + 0.001,
                    longitude: e.detail.position.longitude
                });
            
                const box = document.createElement("a-box");
                box.setAttribute("scale", {
                    x: 20,
                    y: 20,
                    z: 20
                });
                box.setAttribute('material', { color: 'red' } );
                box.setAttribute("position", {
                    x : 0,
                    y : 20,
                    z: 0
                } );
            
                const text = document.createElement("a-text");
                const textScale = 70;
                text.setAttribute("look-at", "[gps-new-camera]");
                text.setAttribute("scale", {
                    x: textScale,
                    y: textScale,
                    z: textScale
                });
                if(dist > 1){
                    text.setAttribute("value", dist.toFixed(2) +"km");
                }else{
                    text.setAttribute("value", (dist.toFixed(2)*1000)+"m");
                }
                text.setAttribute("align", "center");
                compoundEntity.appendChild(box);
                compoundEntity.appendChild(text);
                document.querySelector("a-scene").appendChild(compoundEntity);            
                lastEntity = compoundEntity;
            
        //}
        //testEntityAdded = true;
        
        
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
