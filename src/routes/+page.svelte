<script lang="ts">
	import { onMount } from "svelte"
	let stream
	let video: HTMLVideoElement
	onMount(async() => {
		/*
		const scanner = new BarcodeDetector({
			formats: ["code_39", "codabar", "ean_13"]
		})
			*/
		stream =  await navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: 'environment',
				width: 640,
				height: 480
			}
		})
		video.srcObject = stream

	})
</script>
<div class="container">
	<video bind:this={video} autoplay></video>
</div>