/**
 * Created by zhu_lin on 2018/6/30.
 * 普查地图相关JS
 */

var map;
var YY_FLayer, MZ_FLayer;
var YQLayerGroup = L.layerGroup();
var XZLayerGroup = L.layerGroup();
var YYLayerGroup = L.layerGroup();


/**
 * 初始化地图
 */
function initMap(){
	//初始化并加载底图
	map = L.map("mapDiv", {drawControl: true, zoomControl: false}).setView([29.7318,121.5551], 9);	
    L.esri.basemapLayer('TianDiTuVec').addTo(map);
    L.esri.basemapLayer('TianDiTuVec_A').addTo(map);
    
    //添加定位的control
	map.addControl(L.control.locate({
		position: 'bottomleft',
	    locateOptions: {
	        enableHighAccuracy: true
	    },
	    strings: {
	        title: "Show me where I am, yo!"
	    }
	}));


    // 加载医院
    YY_FLayer = L.esri.dynamicMapLayer({
        url:'http://122.227.234.69:6080/arcgis/rest/services/宁波疫情/宁波市范围线02/MapServer'
    }).addTo(map);
 
    AddYQPointLayers();
    AddYYPointLayers();
    AddXZPointLayers();
}


/**
 * 自定义marker图标
 */
//疫情患者
var YQIcon = L.icon({
    iconUrl: 'img/yqhz.png',
    iconSize: [15, 15],
    //iconAnchor: [16, 37],
    popupAnchor: [0, -10]
});

//新增患者
var XZIcon = L.icon({
    iconUrl: 'img/xzhz.png',
    iconSize: [15, 15],
    //iconAnchor: [16, 37],
    popupAnchor: [0, -10]
});

//定点医院
var YYIcon = L.icon({
    iconUrl: 'img/yylogo.png',
    iconSize: [14, 14],
    //iconAnchor: [16, 37],
    popupAnchor: [0, -10]
});



/**
 * 添加图层（GeoJson点数据）
 */
function AddYQPointLayers() {
    //定义每个marker的PopupContent
    function getEachMarkerPopupContent(feature) {
        //获取当前点坐标
        var px = feature.geometry.coordinates[1]
        var py = feature.geometry.coordinates[0]
        //获取所有信息
        var basicInfo = [feature.properties.Location, feature.properties.Number, feature.properties.Info];

        //定义popwindow内信息
        var popupContent =
            "<div class='info_window'>[位      置]："+ feature.properties.Location +"</div>" +
            "<div class='info_window'>[数      量]："+ feature.properties.Number +"</div>" +
            "<div class='info_window_c'>[详      情]："+ feature.properties.Info +"</div>";
        return popupContent;
    }

    //加载geoJSON点数据
    L.geoJSON(yqdata, {
        pointToLayer: function (feature, latlng) {
            var YQPopupContent = getEachMarkerPopupContent(feature);
            var YQMarker = L.marker(latlng, {icon: YQIcon}).bindPopup(YQPopupContent);
            YQLayerGroup.addLayer(YQMarker);
        }
    });
    map.addLayer(YQLayerGroup);
}

function AddXZPointLayers() {
    //定义每个marker的PopupContent
    function getEachMarkerPopupContent(feature) {
        //获取当前点坐标
        var px = feature.geometry.coordinates[1]
        var py = feature.geometry.coordinates[0]
        //获取所有信息
        var basicInfo = [feature.properties.Location, feature.properties.Number, feature.properties.Info];

        //定义popwindow内信息
        var popupContent =
            "<div class='info_window'>[位       置]："+ feature.properties.Location +"</div>" +
            "<div class='info_window'>[数       量]："+ feature.properties.Number +"</div>" +
            "<div class='info_window_c'>[详       情]："+ feature.properties.Info +"</div>" +
            "<div class='info_window_c'>[新增患者]："+ feature.properties.New +"</div>";
        return popupContent;
    }

    //加载geoJSON点数据
    L.geoJSON(xzdata, {
        pointToLayer: function (feature, latlng) {
            var XZPopupContent = getEachMarkerPopupContent(feature);
            var XZMarker = L.marker(latlng, {icon: XZIcon}).bindPopup(XZPopupContent);
            XZLayerGroup.addLayer(XZMarker);
        }
    });
    map.addLayer(XZLayerGroup);
}

function AddYYPointLayers() {
    //定义每个marker的PopupContent
    function getEachMarkerPopupContent(feature) {
        //获取当前点坐标
        var px = feature.geometry.coordinates[1]
        var py = feature.geometry.coordinates[0]
        //获取所有信息
        var basicInfo = [feature.properties.Name, feature.properties.Type];

        //定义popwindow内信息
        var popupContent =
            "<div class='info_window'>[名      称]："+ feature.properties.Name +"</div>" +
            "<div class='info_window'>[类      型]："+ feature.properties.Type +"</div>";
        return popupContent;
    }

    //加载geoJSON点数据
    L.geoJSON(ddyydata, {
        pointToLayer: function (feature, latlng) {
            var YYPopupContent = getEachMarkerPopupContent(feature);
            var YYMarker = L.marker(latlng, {icon: YYIcon}).bindPopup(YYPopupContent);
            YYLayerGroup.addLayer(YYMarker);
        }
    });
    map.addLayer(YYLayerGroup);
}


function ChangLayer(obj) {
        var currentLayer;
        var layerName = obj.getAttribute('name');
        if (layerName == 'yq'){
            currentLayer = YQLayerGroup;
        }else if(layerName == 'yy'){
            currentLayer = YYLayerGroup;
        }else if(layerName == 'xz'){
            currentLayer = XZLayerGroup;
        }

        if (obj.checked){
            map.addLayer(currentLayer);
        }else {
            map.removeLayer(currentLayer)
        }
 }


function locate(){
	map.locate({
        setView: true,
        maxZoom: 16
    });
    
    map.on('locationfound', function(e) {
	  var radius = e.accuracy / 2;
	  L.marker(e.latlng).addTo(m).bindPopup("你就在这个圈内");
	  L.circle(e.latlng, radius).addTo(m);
	});

	map.on('locationerror', function(e) {
	  console.log('定位出错=====>', e);
	});
}
















