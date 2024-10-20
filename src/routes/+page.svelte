<script lang="ts">
	import '../app.css'
	import manifest from '$lib/manifest.webmanifest?url'
	import Data from '$lib/components/Data.svelte'
	import Selector from '$lib/components/Selector.svelte'
	import Welcome from '$lib/components/Welcome.svelte'
	import Video from '$lib/components/Scanner.svelte'
	let currentView: 'Scanner' | 'Welcome' | 'Selector' | 'Viewer' = 'Welcome'
	let cveData: CVEList | { vendor: string, products: string[] }
	function onCode(returnedData: CVEList | { vendor: string, products: string[] }) {
		console.log('returned data is', returnedData)
		cveData = returnedData
		if ((returnedData as { vendor: string }).vendor)
			currentView = 'Selector'
		else
			currentView = 'Viewer'
	}
	async function searchProduct(vendor: string, product: string) {
		const res = await fetch(`/api/product/${vendor}/${product}`)
		cveData = await res.json()
		currentView = 'Viewer'
	}
	async function getAll() {
		const vendor = (cveData as CVEList).cvelistv5[0][1].vendor
		const res = await fetch(`/api/product/${(cveData as CVEList).cvelistv5[0][1].vendor}`)
		cveData.products = await res.json()
		cveData.vendor = vendor
		currentView = 'Selector'
	}
	function reset() {
		currentView = 'Welcome'
	}
</script>

{#if currentView === 'Welcome'}
	<Welcome onScan={() => currentView = 'Scanner'} />
{:else if currentView === 'Scanner'}
	<Video {onCode} />
{:else if currentView === 'Viewer'}
	<Data cves={cveData} onWrong={getAll} onReset={reset} />
{:else}
	<Selector onSelect={searchProduct} onReset={reset} vendor={cveData.vendor} products={cveData.products} />
{/if}
<svelte:head>
	<link href={manifest} rel="manifest" />
</svelte:head>