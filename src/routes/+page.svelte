<script>
	import { onMount } from 'svelte';

	export let data;

	let map;

	onMount(async () => {
		// Load the Google Maps and the marker library
		const { google } = window;
		const { AdvancedMarkerElement } = await google.maps.marker;

		// Initialize the map
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: { lat: 40.737, lng: -74.003 }, // Central location
			mapId: 'eda1e0b84e64956b'
		});

		// Assuming data is an array of neighborhoods, each with an array of units
		data.neighborhoods.forEach((neighborhood) => {
			neighborhood.units.forEach((unit) => {
				if (unit.location && unit.commute_obj) {
					const position = { lat: unit.location.lat, lng: unit.location.lng };
					const commuteTime = unit.commute_obj.legs[0].duration.text; // Adjust based on actual structure

					// Create a div element for the marker content
					const content = document.createElement('div');
					content.textContent = commuteTime; // Set commute time as text
					content.classList.add('price-tag');

					// Create the advanced marker
					const marker = new AdvancedMarkerElement({
						position: position,
						map: map,
						content: content, // Use the content div as the marker
						title: unit.unit_name // Tooltip
					});
				}
			});
		});
	});
</script>

<div id="map"></div>

<svelte:head>
	<script
		async
		defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJKapYkEXB-jHM5htvhdCbuYG40haS0Cc&libraries=marker&callback=initMap"
	>
	</script>
</svelte:head>

<style>
	body {
		margin: 0;
	}

	#map {
		height: 100vh;
		width: 100%;
	}

	.custom-marker {
		background-color: white;
		padding: 5px;
		border-radius: 5px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
		font-size: 14px;
	}
</style>
