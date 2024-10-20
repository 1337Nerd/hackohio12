 <script lang="ts">
	import type { Action } from 'svelte/action'
	export let onCode
	let error = ''
	const videoHandler: Action<HTMLVideoElement> = async (node) => {
		if (!navigator.mediaDevices?.getUserMedia)
			return error = 'Camera not supported'
		if (!('BarcodeDetector' in globalThis))
			return error = 'Barcode scanner not supported'
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: 'environment',
				width: { ideal: window.innerHeight },
				height: { ideal: window.innerWidth }
			},
			audio: false
		})
		let animationFrameId: number
		node.srcObject = stream
		const supported = await BarcodeDetector.getSupportedFormats()
		const scanner = new BarcodeDetector({ formats: supported })
		const detectBarcode = async () => {
			try {
				if (node.readyState > 1) {
					const codes = await scanner.detect(node)
					if (codes.length) {
						const res = await fetch(`/api/barcode/${codes[0].rawValue}`)
						const cveData = await res.json()
						cancelAnimationFrame(animationFrameId)
						return onCode(cveData)
					}
				}
			} catch (e) {
				console.log(e)
			}
			animationFrameId = requestAnimationFrame(detectBarcode)
		}
		detectBarcode()
		return {
			destroy() {
				stream.getTracks().forEach((track) => track.stop())
				cancelAnimationFrame(animationFrameId)
			}
		}
	}
</script>
<video use:videoHandler class="size-full" class:hidden={error} autoplay muted />
{error}