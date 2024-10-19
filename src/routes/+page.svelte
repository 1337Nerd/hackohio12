<script lang="ts">
	import '../app.css'
	import type { Action } from 'svelte/action'
	let error = ''
	const videoHandler: Action<HTMLVideoElement> = async(node) => {
		if (!navigator.mediaDevices?.getUserMedia) {
			error = 'Camera not supported'
			return
		}
		if (!("BarcodeDetector" in globalThis)) {
			error = 'Barcode scanner not supported'
			return
		}
		const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
		const fps = stream.getVideoTracks()[0].getSettings().frameRate ?? 1
		node.srcObject = stream
		const supported = await BarcodeDetector.getSupportedFormats()
		const scanner = new BarcodeDetector({ formats: supported })
		const detectBarcode = async() => {
			if (!node.readyState)
				return
			const codes = await scanner.detect(node)
			if (!codes.length)
				return error = ''
			console.log('detected')
			error = codes.map(code => code.rawValue).toString()
		}
		const scan = setInterval(detectBarcode, 1000 / fps)
		return {
			destroy() {
				stream.getTracks().forEach(track => track.stop())
				clearInterval(scan)
			}
		}
	}
</script>
<video use:videoHandler class="size-full" autoplay muted />
{error}