<script lang="ts">
	import '../app.css'
	import { onMount } from "svelte"
	let error = ''
	let video: HTMLVideoElement
	onMount(async() => {
		if (!navigator.mediaDevices?.getUserMedia)
			return error = 'Camera not supported'
		if (!("BarcodeDetector" in globalThis))
			return error = 'Barcode scanner not supported'
		const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
		video.srcObject = stream
		const supported = await BarcodeDetector.getSupportedFormats()
		const scanner = new BarcodeDetector({
			formats: supported
		})

	})
</script>
<div class="size-full">
	<video class="size-full" bind:this={video} autoplay></video>
	<div>{error}</div>
</div>