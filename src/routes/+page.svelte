<script lang="ts">
	export let data
	import '../app.css'
	import Data from '$lib/components/Data.svelte'
	import Selector from '$lib/components/Selector.svelte'
	import Welcome from '$lib/components/Welcome.svelte'
	import Video from '$lib/components/Scanner.svelte'
	let welcome = true
	let cveData: CVEList | { vendor: string, products: string[] } | undefined
	async function fetchProduct(vendor: string, product?: string) {
		const res = await fetch(`/api/product/${encodeURIComponent(vendor)}${product ? '/' + encodeURIComponent(product) : ''}`)
		return res.json()
	}
	async function getAll() {
		const vendor = (cveData as CVEList).cvelistv5[0][1].vendor
		cveData = { vendor, products: await fetchProduct(vendor) }
	}
	function reset() {
		welcome = true
		cveData = undefined
	}
</script>

{#if !cveData}
	{#if welcome}
		<Welcome onScan={() => welcome = false} />
	{:else}
		<Video onCode={(returnedData) => cveData = returnedData} />
	{/if}
{:else}
	{#if !(cveData && 'vendor' in cveData)}
		<Data cves={cveData} onWrong={getAll} onReset={reset} />
	{:else}
		<Selector onSelect={async (vendor, product) => cveData = await fetchProduct(vendor, product)} onReset={reset} cveList={cveData} />
	{/if}
{/if}
<svelte:head>
	<link href={data.manifest} rel="manifest" />
</svelte:head>
<svelte:options immutable={true} />