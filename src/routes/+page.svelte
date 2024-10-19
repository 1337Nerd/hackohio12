<script lang="ts">
	import '../app.css'
	import type { Action } from 'svelte/action'
	let error = ''
	const videoHandler: Action = async(node: HTMLVideoElement) => {
		if (!navigator.mediaDevices?.getUserMedia) {
			error = 'Camera not supported'
			return
		}
		if (!("BarcodeDetector" in globalThis)) {
			error = 'Barcode scanner not supported'
			return
		}
		const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
		node.srcObject = stream
		const supported = await BarcodeDetector.getSupportedFormats()
		const scanner = new BarcodeDetector({
			formats: supported
		})
		return {
			destroy() {
				stream.getTracks().forEach(track => track.stop())
			}
		}
	}
</script>
<div class="size-full">
	<video use:videoHandler class="size-full" autoplay />
	<div>{error}</div>
</div>