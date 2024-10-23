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
			console.log('window is', window.innerWidth, window.innerHeight)
			navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: 'environment',
				},
			}).then((srcStream) => {
				const tracks = srcStream.getTracks()
				tracks.forEach(t => {
					if (t.getCapabilities) {
						const { width, height } = t.getCapabilities()
						if ((width?.max ?? 1920) > window.innerWidth || (height?.max ?? 1080) > window.innerHeight)
							t.applyConstraints({ aspectRatio: window.innerHeight / window.innerWidth })
						else if (width.max && height.max)
							t.applyConstraints({ width: { exact: width.max }, height: { exact: height?.max } })
					}
					else {
						t.applyConstraints({ height: { ideal: window.innerHeight }, width: window.innerWidth })
					}
				})
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
<video use:videoHandler class="size-full max-h-dvh" class:hidden={error} autoplay muted />
{error}