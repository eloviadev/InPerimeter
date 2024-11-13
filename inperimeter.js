var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

var watertaxi_departure = false;
var watertaxi_destination = false;


function calcRoute() {

	if($('.mobile__controls').hasClass('active')) {
		$('.opened').removeClass('opened');
			$('.explain__pad').addClass('closed');
			$('.mobile__controls').removeClass('active');
			$('.mobile__controls button .bi').removeAttr('style');
			$('.mobile__controls button span').text('Expand');
	}
	
	directionsDisplay.setOptions({
		map: window.theMap,
		preserveViewport: true, //this will help center the map on the desired viewport section
		polylineOptions: {
			strokeColor: '#0f53ff',
			strokeWeight: 6,
		}
	});

	var mediaQuery = window.matchMedia("(max-width: 500px)");

	//centering the map after DirectionsRenderer executes considering where the controls are laying
	directionsDisplay.addListener('directions_changed', function() {
		var routeBounds = directionsDisplay.getDirections().routes[0].bounds;

		if(mediaQuery.matches) {
			window.theMap.fitBounds(routeBounds, {top: 0, right: 0, bottom: 457, left: 0}); //setting map padding based on controls position
		} else {
			window.theMap.fitBounds(routeBounds, {top: 0, right: 0, bottom: 100, left: 350}); //setting map padding based on sidebar position
		}
		
	});
	
	directionsDisplay.setMap(theMap);
	
	//creating new JS promise to check if departure address falls into perimeter
	var checkingDeparture = new Promise((resolve, reject) => {
		var newDeparture = '';
		var geocoder = new google.maps.Geocoder();
		
		//converting departure address to coordinates
		geocoder.geocode({'address': $('#startTransfer').val()}, (results, status) => {
			if(status == google.maps.GeocoderStatus.OK) {
				coordPoint = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()); //checking if coordinates fall into perimeter
				
				//if YES:
				if(google.maps.geometry.poly.containsLocation(coordPoint, window.venicePolygon)) {
					newDeparture = 'Piazzale Roma, Venezia, VE, Italia'; //change departure address to last identified point reachable by land
					$('.wt__departure').text($('#startTransfer').val());
					$('.departure__js').css({'display': 'block'});
					$('.destination__js').removeAttr('style');
					$('#watertaxi__field').val('true');
					watertaxi_departure = true; //updating boolean value to save status
				}
				else {
					newDeparture = $('#startTransfer').val();
					$('#watertaxi__field').val('false');
					watertaxi_departure = false;
				}
				
				resolve(newDeparture);
			}
			else {
				reject('Sorry there was an error with checkingDeparture promise...');
			}
		});
	});
	
	//creating new JS promise to check if departure address falls into perimeter
	var checkingDestination = new Promise((resolve, reject) => {
		var newDestination = '';
		var geocoder = new google.maps.Geocoder();
		
		//converting destination address to coordinates
		geocoder.geocode({'address': $('#endTransfer').val()}, (results, status) => {
			if(status == google.maps.GeocoderStatus.OK) {
				coordPoint = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()); //checking if coordinates fall into perimeter
				
				//if YES:
				if(google.maps.geometry.poly.containsLocation(coordPoint, window.venicePolygon)) {
					newDestination = 'Piazzale Roma, Venezia, VE, Italia'; //change departure address to last identified point reachable by land
					$('.wt__destination').text($('#endTransfer').val());
					$('.destination__js').css({'display': 'block'});
					$('.departure__js').removeAttr('style');
					$('#watertaxi__field').val('true');
					watertaxi_destination = true; //updating boolean value to save status
				}
				else {
					newDestination = $('#endTransfer').val();
					$('#watertaxi__field').val('false');
					watertaxi_destination = false;
				}
				
				resolve(newDestination);
			}
			else {
				reject('Sorry there was an error with checkingDestination promise...');
			}
			
		});
	});
	
	//calling promises
	var checkedDeparture = checkingDeparture;
	var checkedDestination = checkingDestination;
	
	//after promises completion
	Promise.all([checkedDeparture, checkedDestination]).then((values) => {
		var request = {
			origin: values[0],
			destination: values[1],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC
		};
		
		//get route with checked addresses
		directionsService.route(request, (result, status) => {
			if(status == google.maps.DirectionsStatus.OK) {
				//check if one or both between departure and destination have resulted positive to the check
				if(watertaxi_departure || watertaxi_destination) {
					$('.watertaxi__pad').css({'visibility': 'visible', 'opacity': '1'});
				} else {
					$('.watertaxi__pad').removeAttr('style');
				}
				
				directionsDisplay.setDirections(result);
				$('.command__centre a').css({'text-decoration': 'underline', 'color': '#6f6565', 'pointer-events': 'auto'});
				$('.command__centre a .bi').css({'color': '#ff5930'});
			}
			
			else {
				directionsDisplay.setDirections({routes: []});
				theMap.setCenter(window.globalCenter);
			}
		});
	}).catch(e => {
		console.log(e);
	});
}

$('#transfer__fire').click(calcRoute);