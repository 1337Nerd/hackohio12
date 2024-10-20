<script lang="ts">
	export let onScan
</script>
<div class="flex flex-col items-center justify-center min-h-screen bg-white m-4">
	<img src="/path/to/your/logo.png" alt="RiskBuster Logo" class="mb-8 w-40 h-auto" />
	<h1 class="text-3xl font-bold mb-4 text-center text-red-600">Welcome to RiskBuster!</h1>
	<p class="text-gray-700 mb-6 text-center">
		Scan a barcode to identify hardware vulnerabilities. Press the button below to launch the camera.
	 </p>
	 <button on:click={onScan} class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300">
		Start Camera
	</button>
</div>