<script lang="ts">
	import logo from '$lib/riskBustersTransparent.png?url'
	import type { Action } from 'svelte/action'
	export let onScan
	const hydrate: Action<HTMLButtonElement> = (node) => {
		node.disabled = false
	}
</script>
<div class="flex flex-col items-center justify-center min-h-svh bg-white m-4">
	<img src={logo} alt="riskBuster Logo" class="mb-8 w-72 h-auto aspect-[741/490]" />
	<h1 class="text-3xl font-bold mb-4 text-center text-red-600">Welcome to riskBuster!</h1>
	<p class="text-gray-700 mb-6 text-center">
		Scan a barcode to identify hardware vulnerabilities. Press the button below to launch the camera.
	 </p>
	 <button use:hydrate on:click={onScan} disabled class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md enabled:hover:bg-red-700 transition duration-300">
		Start Camera
	</button>
</div>