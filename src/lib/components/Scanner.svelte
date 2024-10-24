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
				},
			}).then((srcStream) => {
				const tracks = srcStream.getTracks()
				const { innerHeight, innerWidth } = window
				const threshold = 2
				tracks.forEach(t => {
					if (t.getCapabilities) {
						const { width, height } = t.getCapabilities()
						if ((width?.max ?? 1920) > innerWidth * threshold || (height?.max ?? 1080) > innerHeight * threshold)
							t.applyConstraints({ aspectRatio: innerHeight / innerWidth, facingMode: 'environment' })
						else if (width?.max && height?.max)
							t.applyConstraints({ width: { exact: width.max }, height: { exact: height.max }, facingMode: 'environment' })
					}
					else {
						t.applyConstraints({ height: { ideal: innerHeight }, width: { ideal: innerWidth }, facingMode: 'environment' })
					}
				})
				node.srcObject = srcStream
				BarcodeDetector.getSupportedFormats().then(formats => {
					const scanner = new BarcodeDetector({ formats })
					const detectBarcode = () => {
						if (node.readyState > 1) {
							scanner.detect(node).then(codes => {
								if (codes.length) {
									cancelAnimationFrame(animationFrameId)
									fetch(`/api/barcode/${codes[0].rawValue}`).then(res => res.json()).then(cveData => onCode(cveData))
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
			}).catch(err => {
				console.error('Error accessing camera:', err)
				error = err
				return
			})
		}

		if (!('BarcodeDetector' in globalThis))
			import('@undecaf/barcode-detector-polyfill').then(({ BarcodeDetectorPolyfill }) => { window.BarcodeDetector = BarcodeDetectorPolyfill as unknown as BarcodeDetector; startStream(); })
		else
			startStream()

		return {
			destroy() {
				if (node.srcObject)
					(node.srcObject as MediaStream).getTracks().forEach(track => track.stop())
				cancelAnimationFrame(animationFrameId)
			}
		}
	}
</script>
<div aria-hidden={!error} class="text-red-500 font-bold text-xl h-svh items-center flex justify-center aria-hidden:hidden peer">{error}</div>
<video use:videoHandler class="size-full max-h-dvh hidden peer-aria-hidden:block" autoplay muted />