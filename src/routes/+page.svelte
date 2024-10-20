<script lang="ts">
	import '../app.css'
	import Data from '$lib/components/Data.svelte'
	import Selector from '$lib/components/Selector.svelte'
	import { cveData } from '$lib/components/cveData'
	import Welcome from '$lib/components/Welcome.svelte'
	import Video from '$lib/components/Scanner.svelte'
	let currentView: 'Scanner' | 'Welcome' | 'Selector' | 'Viewer' = 'Welcome'
	function onCode(bool: boolean) {
		if (bool)
			currentView = 'Viewer'
		else
			currentView = 'Selector'
	}
	async function searchProduct(vendor: string, product: string) {
		const res = await fetch(`/api/product/${vendor}/${product}`)
		$cveData = await res.json()
		currentView = 'Viewer'
	}
	async function getAll() {
		const vendor = $cveData.cvelistv5[0][1].vendor
		const res = await fetch(`/api/product/${$cveData.cvelistv5[0][1].vendor}`)
		$cveData.products = await res.json()
		$cveData.vendor = vendor
		currentView = 'Selector'
	}
</script>

{#if currentView === 'Welcome'}
	<Welcome onScan={() => currentView = 'Scanner'} />
{:else if currentView === 'Scanner'}
	<Video {onCode} />
{:else if currentView === 'Viewer'}
	<Data cves={$cveData} onWrong={getAll} />
{:else}
	<Selector onSelect={searchProduct} vendor={$cveData.vendor} products={$cveData.products} />
{/if}