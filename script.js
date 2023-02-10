window.onload = () => {
    //let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    let lastEntity;

    const latitude = 35.2664;
    const longitude = 129.0931;

    
    el.addEventListener("gps-camera-update-position", e => {
        
        
        // 거리
        const dist = getDistanceFromLatLonInKm(latitude,longitude,e.detail.position.latitude,e.detail.position.longitude);
        // 각도
        const bear = bearing(latitude,longitude,e.detail.position.latitude,e.detail.position.longitude);


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
                    text.setAttribute("value", dist.toFixed(3) +"km, "+bear);
                }else{
                    text.setAttribute("value", (dist.toFixed(3)*1000)+"m, "+bear);
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

function bearing(lat1, lon1, lat2, lon2){

    // 현재 위치 : 위도나 경도는 지구 중심을 기반으로 하는 각도이기 때문에 라디안 각도로 변환한다.
    var Cur_Lat_radian = lat1 * (3.141592 / 180);
    var Cur_Lon_radian = lon1 * (3.141592 / 180);

    // 목표 위치 : 위도나 경도는 지구 중심을 기반으로 하는 각도이기 때문에 라디안 각도로 변환한다.
    var Dest_Lat_radian = lat2 * (3.141592 / 180);
    var Dest_Lon_radian = lon2 * (3.141592 / 180);


    // radian distance
    var radian_distance = 0;

    radian_distance = Math.acos(Math.sin(Cur_Lat_radian) * Math.sin(Dest_Lat_radian) + Math.cos(Cur_Lat_radian) * Math.cos(Dest_Lat_radian) * Math.cos(Cur_Lon_radian - Dest_Lon_radian));

    // 목적지 이동 방향을 구한다.(현재 좌표에서 다음 좌표로 이동하기 위해서는 방향을 설정해야 한다. 라디안값이다.
    var radian_bearing = Math.acos((Math.sin(Dest_Lat_radian) - Math.sin(Cur_Lat_radian) * Math.cos(radian_distance)) / (Math.cos(Cur_Lat_radian) * Math.sin(radian_distance)));        // acos의 인수로 주어지는 x는 360분법의 각도가 아닌 radian(호도)값이다.        


    var true_bearing = 0;
    if (Math.sin(Dest_Lon_radian - Cur_Lon_radian) < 0)
    {
        true_bearing = radian_bearing * (180 / 3.141592);
        true_bearing = 360 - true_bearing;
    }
    else
    {
        true_bearing = radian_bearing * (180 / 3.141592);
    }

    return parseInt(true_bearing);
}
