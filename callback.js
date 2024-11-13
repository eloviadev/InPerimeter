//Google Maps API callback function
function roadCalculator() {
	
	var zoomValue = 0;
	var mediaQuery = window.matchMedia("(max-width: 500px)");
	
	if(mediaQuery.matches) {
		 zoomValue = 11	;
	}
	
	else {
		zoomValue = 12;
	}
	
	if($('#travelMap').length) {
		if(mediaQuery.matches) {
			var mapCenter = {lat: 45.344523, lng: 12.272435};
		} else {
			var mapCenter = {lat: 45.426497, lng: 12.239182};
		}

		window.globalCenter = mapCenter;
		
		//map initialization values
		var mapInit = {
			center: mapCenter,
			zoom: zoomValue,
			mapTypeId: 'roadmap',
			mapTypeControl: false,
			streetViewControl: false,
			fullscreenControl: false,
			zoomControl: true
		};
		
		window.theMap = new google.maps.Map($('#travelMap')[0], mapInit); //define map element
		
		//perimeter coordinate points
		const veniceArea = [
			{lat: 45.439573, lng: 12.3186954},
			{lat: 45.4386696, lng: 12.3198541},
			{lat: 45.4370736, lng: 12.3200258},
			{lat: 45.4364412, lng: 12.3169144},
			{lat: 45.43611, lng: 12.3156055},
			{lat: 45.4367424, lng: 12.3153051},
			{lat: 45.4371338, lng: 12.3151334},
			{lat: 45.4379921, lng: 12.3148759},
			{lat: 45.4376608, lng: 12.314361},
			{lat: 45.4363961, lng: 12.3133095},
			{lat: 45.4348151, lng: 12.3119362},
			{lat: 45.4332792, lng: 12.310799},
			{lat: 45.4317132, lng: 12.3095115},
			{lat: 45.430722, lng: 12.3095302},
			{lat: 45.428945, lng: 12.3069124},
			{lat: 45.4269069, lng: 12.30452},
			{lat: 45.4243166, lng: 12.3088115},
			{lat: 45.4229913, lng: 12.3194545},
			{lat: 45.421251, lng: 12.3329807},
			{lat: 45.4255281, lng: 12.3472286},
			{lat: 45.4239619, lng: 12.3608756},
			{lat: 45.4241922, lng: 12.3671529},
			{lat: 45.4267329, lng: 12.3687721},
			{lat: 45.4298513, lng: 12.3666322},
			{lat: 45.4322305, lng: 12.3639286},
			{lat: 45.4336158, lng: 12.3627699},
			{lat: 45.4365369, lng: 12.3643577},
			{lat: 45.4374102, lng: 12.3644006},
			{lat: 45.4382835, lng: 12.3647869},
			{lat: 45.4392471, lng: 12.3654306},
			{lat: 45.4403913, lng: 12.3656452},
			{lat: 45.4419602, lng: 12.3627807},
			{lat: 45.4418699, lng: 12.3604204},
			{lat: 45.4436163, lng: 12.3597767},
			{lat: 45.4435862, lng: 12.3576738},
			{lat: 45.4426528, lng: 12.3554851},
			{lat: 45.4418398, lng: 12.3533394},
			{lat: 45.4401837, lng: 12.350979},
			{lat: 45.4402138, lng: 12.3477175},
			{lat: 45.4415989, lng: 12.3447992},
			{lat: 45.4440378, lng: 12.3405506},
			{lat: 45.445453, lng: 12.3381473},
			{lat: 45.4476509, lng: 12.3355724},
			{lat: 45.4492767, lng: 12.3317959},
			{lat: 45.4501498, lng: 12.3283626},
			{lat: 45.4502401, lng: 12.3246719},
			{lat: 45.4490358, lng: 12.318063},
			{lat: 45.446567, lng: 12.3158743},
			{lat: 45.4444126, lng: 12.3148432},
			{lat: 45.4424253, lng: 12.3156479},
			{lat: 45.4413448, lng: 12.316532},
			{lat: 45.4402643, lng: 12.3177765},
			{lat: 45.439573, lng: 12.3186954},
			{lat: 45.439573, lng: 12.3186954},
		];
		
		//create perimeter
		window.venicePolygon = new google.maps.Polygon({
			paths: veniceArea
		});
		
		window.venicePolygon.setVisible(false);
		window.venicePolygon.setMap(theMap);
	}
	
	//google maps autocompletion
	var completeStart = new google.maps.places.SearchBox($('#startTransfer')[0]);
	var completeEnd = new google.maps.places.SearchBox($('#endTransfer')[0]);
}