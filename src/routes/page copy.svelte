<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data;

	let map;
	let markers = [];

	onMount(() => {
		if (browser) {
			loadGoogleMapsApi().then(() => {
				initMap();
			});
		}
	});

	async function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: { lat: 40.7128, lng: -74.006 } // Centered at New York
		});

		const { AdvancedMarkerElement } = await google.maps.marker;

		data.neighborhoods.forEach((neighborhood) => {
			neighborhood.units.forEach((unit) => {
				const marker = new AdvancedMarkerElement({
					position: { lat: unit.lat, lng: unit.lng }, // Replace with actual lat, lng
					map: map,
					title: unit.unit_name
				});
				markers.push(marker);
			});
		});
	}

	function loadGoogleMapsApi() {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCJKapYkEXB-jHM5htvhdCbuYG40haS0Cc&callback=resolveGoogleMapsAPI&libraries=marker`;
			script.defer = true;
			script.async = true;
			window.resolveGoogleMapsAPI = () => {
				resolve();
				delete window.resolveGoogleMapsAPI;
			};
			document.head.appendChild(script);
		});
	}
</script>

<div id="map" style="width: 100%; height: 100vh;"></div>

<style>
	/* Your styles here */
</style>
