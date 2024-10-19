<script lang="ts">
	import '../app.css'
	import type { Action } from 'svelte/action'
	let cveData
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
						const res = await fetch(`/api/barcode/${codes[0].rawValue}`)
						cveData = await res.json()
						console.log('cveData is', cveData)
						cancelAnimationFrame(animationFrameId)
						node.classList.add('hidden')
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
{#if cveData}
{JSON.stringify(cveData)}
{:else}
<video use:videoHandler class="size-full" class:hidden={cveData} autoplay muted />
{error}
{/if}