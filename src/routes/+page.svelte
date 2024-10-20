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
</script>

{#if currentView === 'Welcome'}
	<Welcome onScan={() => currentView = 'Scanner'} />
{:else if currentView === 'Scanner'}
	<Video {onCode} />
{:else if currentView === 'Viewer'}
	<Data cves={$cveData} />
{:else}
	<Selector vendor={$cveData.vendor} products={$cveData.products} />
{/if}