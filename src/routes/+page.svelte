<script lang="ts">
	import '../app.css'
	import { onMount } from "svelte"
	let error = ''
	let video: HTMLVideoElement
	onMount(async() => {
		/*
		const scanner = new BarcodeDetector({
			formats: ["code_39", "codabar", "ean_13"]
		})
			*/
		if (!navigator.mediaDevices?.getUserMedia)
			return error = 'Camera not supported'
		navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false }).then(stream => video.srcObject = stream);

	})
</script>
<div class="size-full">
	<video class="size-full" bind:this={video} autoplay></video>
	<div>{error}</div>
</div>