<script lang="ts">
	import '../app.css'
	import type { Action } from 'svelte/action'
	let cvedata = ''
	let error = ''
	async function getProduct(upc: string) {
		const res = await fetch(`/api/barcode/${upc}`)
		const data = await res.json()
		const { manufacturer, model, title } = data.products[0]
		return { manufacturer, model, title }
	}
	async function getCVEByMan(man: string) {
		const res = await fetch(`/api/vendor/${man}`)
		const data = await res.json()
		return data
	}
	const videoHandler: Action<HTMLVideoElement> = async(node) => {
		if (!navigator.mediaDevices?.getUserMedia) {
			error = 'Camera not supported'
			return
		}
		if (!("BarcodeDetector" in globalThis)) {
			error = 'Barcode scanner not supported'
			return
		}
		const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: window.innerHeight }, height: { ideal: window.innerWidth } }, audio: false })
		let animationFrameId: number
		node.srcObject = stream
		const supported = await BarcodeDetector.getSupportedFormats()
		const scanner = new BarcodeDetector({ formats: supported })
		const detectBarcode = async() => {
			try {
				if (node.readyState > 1) {
					const codes = await scanner.detect(node)
					if (!codes.length)
						error = ''
					else {
						console.log('detected', codes.map(code => code.rawValue).toString())
						error = codes.map(code => code.rawValue).toString()
						const { manufacturer, model, title } = await getProduct(codes[0].rawValue)
						cancelAnimationFrame(animationFrameId)
						return
					}
				}
			}
			catch(e) {
				console.log(e)
			}
			animationFrameId = requestAnimationFrame(detectBarcode)
		}
		detectBarcode()
		return {
			destroy() {
				stream.getTracks().forEach(track => track.stop())
				cancelAnimationFrame(animationFrameId)
			}
		}
	}
</script>
<video use:videoHandler class="size-full" autoplay muted />
{error}
{cvedata}