/** @type {string} */
result_val = "";
zoom = "";
max_lat = "";
max_lng = "";
min_lat = "";
min_lng = "";
page = "";
map = "";
demo ="";
infoBubble="";
infoBubble1="";
test="";
location_name="";
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function ChangeUrl(resolvedPath) {
    var path = window.location.href.split("?")[0];
    resolvedPath = path + "?" + resolvedPath;
    if (typeof history.pushState != "undefined") {
        var _detail = {
            Page: path,
            Url: resolvedPath
        };
        history.pushState(_detail, _detail.Page, _detail.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
}
function Search() {
    StartLoading();
    if (location_name == "") {
		location_name = getUrlVars()["keyword"];
		
	}
	
    if (max_lat == "" && max_lng == "" && min_lat == "" && min_lng == "" && zoom == "") {
        max_lat = getUrlVars()["max_lat"];
        max_lng = getUrlVars()["max_lng"];
        min_lat = getUrlVars()["min_lat"];
        min_lng = getUrlVars()["min_lng"];
        zoom = getUrlVars()["zoom"];
    }
    if (sort_val == "") {
        sort_val = getUrlVars()["sort_val"];
    }
    
	
    if (page == -1) {
        page = "";

    } else {
        if (page == "") {
            page = getUrlVars()["page"];
        }
    }
	if (location_name != undefined && location_name != "") {
        result_val = result_val + "&keyword=" + location_name;
    }
	if (max_lat != undefined && max_lng != undefined && min_lat != undefined && min_lng != undefined && zoom != undefined) {
        result_val = result_val + "&max_lat=" + max_lat + "&max_lng=" + max_lng + "&min_lat=" + min_lat + "&min_lng=" + min_lng + "&zoom=" + zoom;
    }
	if (page != undefined && page != "") {
        result_val = result_val + "&page=" + page;
    }
	
    ChangeUrl(result_val);
    OutPutgetResult();
 

}
/**
 * @return {undefined}
 */
function FullSearchPropertyType() {
    result_val = "";
    Search();
    GetBottomFilter();
}
/**
 * @return {undefined}
 */
function OutPutgetResult() {

   
    sort_val = getUrlVars()["sort_val"];
    location_name = getUrlVars()["keyword"];
    max_lat = getUrlVars()["max_lat"];
    max_lng = getUrlVars()["max_lng"];
    min_lat = getUrlVars()["min_lat"];
    min_lng = getUrlVars()["min_lng"];
    zoom = getUrlVars()["zoom"];
	
	 if (location_name == undefined) {
        location_name = "";
    }
	querystring = "keyword=" + location_name;
	if (sort_val != undefined) {
        querystring = querystring + "&sort_val=" + sort_val;
    }
    if (location_name != undefined) {
        querystring = querystring + "&keyword=" + location_name;
    }
   
    if (page != undefined) {
        querystring = querystring + "&page=" + page;
    }
    if (max_lat != undefined && max_lng != undefined && min_lat != undefined && min_lng != undefined && zoom != undefined) {
        querystring = querystring + "&max_lat=" + max_lat + "&max_lng=" + max_lng + "&min_lat=" + min_lat + "&min_lng=" + min_lng + "&zoom=" + zoom;
    }
    $.ajax({
        type: "GET",
        url: "Controls/properties_list.php",
        data: querystring,
        cache: false,
        success: function(html) {
			//alert(html); 
            $("#divresults").html(html);
            $("#divTotalProperty").html($("#hdTotalRecord").val());
          
        }
    });

    $.ajax({
        type: "GET",
        url: "Controls/map_locatoin_list.php",
        data: querystring,
        cache: false,
        success: function(html) {
			//alert(html);
			//console.warn(html);
		       google_map(JSON.parse(html));
			       StopLoading();
        }
    });




}

$(document).ready(function() {
	 StartLoading();
    OutPutgetResult();
});


function displayRecords(pageNum) {
    result_val = "";
    page = pageNum;
    Search();
}

function map_search(x_min_lat, x_max_lat, x_min_lng, x_max_lng, x_zoom) {

    if (max_lat != x_max_lat && max_lng != x_max_lng && min_lat != x_min_lat && min_lng != x_min_lng) {
        result_val = "";
        max_lat = x_max_lat;
        max_lng = x_max_lng;
        min_lat = x_min_lat;
        min_lng = x_min_lng;
        zoom = x_zoom;
        Search();
    }
}

is_first_time_load = true;
var markerCluster=null;

function google_map(val) {

    var locations = val;

    var labelIndex = 0;
    var infowindow = null;
    var new_markers = new Array();

    $(document).ready(function() {
        if (is_first_time_load) {
            initialize();
        }
		else
		{
			 markerCluster.clearMarkers();
			 setMarkers(map, locations);
		}
    });

    function initialize() {

        var centerMap = new google.maps.LatLng(20.5937, 78.9629);

        var myOptions = {
            zoom: 4,
            minZoom: 3,
            maxZoom: 18,
            streetViewControl: false,
            center: centerMap,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        }

        map = new google.maps.Map(document.getElementById("property_map"), myOptions);


        setMarkers(map, locations);
        infowindow = new google.maps.InfoWindow({
            content: "loading..."
        });

     
    }


    function setMarkers(map, markers) {

        google.maps.event.addListener(map, 'zoom_changed', function() {
            zoomLevel = map.getZoom();
            center = map.getCenter();

            var bounds1 = map.getBounds();

            var min_lat = bounds1.getSouthWest().lat();
            var min_lng = bounds1.getSouthWest().lng();

            var max_lat = bounds1.getNorthEast().lat();
            var max_lng = bounds1.getNorthEast().lng();


            $('#zoom').val(zoomLevel);
            $('#min_lat').val(min_lat);
            $('#max_lat').val(max_lat);
            $('#min_lng').val(min_lng);
            $('#max_lng').val(max_lng);
            if (!is_first_time_load) {
                map_search(min_lat, max_lat, min_lng, max_lng, zoomLevel);

            }
            is_first_time_load = false;
            //console.log("Zoommmmmm   my area="+area+" Min Area="+min_area+ " Max Area="+max_area);
        });
		 google.maps.event.addListener(map, 'dragend', function() {
																	  
																	   
            zoomLevel = map.getZoom();
            center = map.getCenter();

            var bounds1 = map.getBounds();

            var min_lat = bounds1.getSouthWest().lat();
            var min_lng = bounds1.getSouthWest().lng();

            var max_lat = bounds1.getNorthEast().lat();
            var max_lng = bounds1.getNorthEast().lng();


            $('#zoom').val(zoomLevel);
            $('#min_lat').val(min_lat);
            $('#max_lat').val(max_lat);
            $('#min_lng').val(min_lng);
            $('#max_lng').val(max_lng);
            if (!is_first_time_load) {
                map_search(min_lat, max_lat, min_lng, max_lng, zoomLevel);

            }
			is_first_time_load = false;
			
            
            //console.log("Zoommmmmm   my area="+area+" Min Area="+min_area+ " Max Area="+max_area);
        });

        var latlngbounds = new google.maps.LatLngBounds();

        for (var i = 0; i < markers.length; i++) {


            var sites = markers[i];
            var siteLatLng = new google.maps.LatLng(sites.latitude, sites.longitude);
            latlngbounds.extend(siteLatLng);


            var marker = new google.maps.Marker({
                position: siteLatLng,
                map: map,


            });

                 new_markers.push(marker);

		
            google.maps.event.addListener(marker, "click", function() {
             
                map.setCenter(marker.getPosition());
				if(infoBubble.isOpen_)
				{
					  infoBubble.close();
				}
				if(infoBubble1.isOpen_)
				{
					  infoBubble1.close();
				}
               
			
                map_search(min_lat, max_lat, min_lng, max_lng, zoomLevel);
            });
			google.maps.event.addListener(map, 'click', function() {

				if(infoBubble.isOpen_)
				{
					  infoBubble.close();
				}
				if(infoBubble1.isOpen_)
				{
					  infoBubble1.close();
				}
					   
			});
        }
		 
         markerCluster = new MarkerClusterer(map, new_markers, {axZoom: 18,gridSize: 10, zoomOnClick : true});
		
		
	
		google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
		
		 
	 

	 
		

});
       
	   if(is_first_time_load==true)
	   {
			
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);
	   }
      

    }
	
}
