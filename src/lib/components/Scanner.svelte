 <script lang="ts">
	import type { Action } from 'svelte/action'
	export let onCode: (returnedData: CVEList | { vendor: string; products: string[] }) => void
	let error = ''
	const videoHandler: Action<HTMLVideoElement> = (node) => {
		if (!navigator.mediaDevices?.getUserMedia) {
			error = 'Camera not supported'
			return
		}
		let animationFrameId: number
		const startStream = () => {
			navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: 'environment',
					width: { ideal: window.innerHeight },
					height: { ideal: window.innerWidth }
				},
				audio: false
			}).then((srcStream) => {
				node.srcObject = srcStream
				BarcodeDetector.getSupportedFormats().then((formats) => {
					const scanner = new BarcodeDetector({ formats })
					const detectBarcode = () => {
						if (node.readyState > 1) {
							scanner.detect(node).then(codes => {
								if (codes.length) {
									fetch(`/api/barcode/${codes[0].rawValue}`).then(res => res.json()).then(cveData => {
										cancelAnimationFrame(animationFrameId)
										onCode(cveData)
									})
								}
							}).catch((err) => {
								console.error('Error detecting barcode:', err)
								error = err
							})
						}
						animationFrameId = requestAnimationFrame(detectBarcode)
					}
					detectBarcode()
				}).catch(err => {
					console.error('Error getting supported formats:', err)
					error = err
					return
				})
			}).catch((err) => {
				console.error('Error accessing camera:', err)
				error = err
				return
			})
		}

		if (!('BarcodeDetector' in globalThis)) {
			import('@undecaf/barcode-detector-polyfill').then(({ BarcodeDetectorPolyfill }) => {
				window.BarcodeDetector = BarcodeDetectorPolyfill as unknown as BarcodeDetector
				startStream()
			})
		}
		else {
			startStream()
		}

		return {
			destroy() {
				if (node.srcObject)
					(node.srcObject as MediaStream).getTracks().forEach(track => track.stop())
				cancelAnimationFrame(animationFrameId)
			}
		}
	}
</script>
<video use:videoHandler class="size-full" class:hidden={error} autoplay muted />
{error}