<script lang="ts">
	export let cves: CVEList
	export let onWrong
	export let onReset
	import icon from '$lib/icon.png?url'
	function formatDate(date: string) {
		return new Date(date).toLocaleDateString()
	}
	function truncateText(text: string) {
		if (text.length > 40)
			return `${text.slice(0, 40)}...`
		return text
	}
</script>
<header class="bg-white p-4 shadow-md fixed w-full flex items-center z-10">
	<button type="button" class="flex items-center" on:click={onReset}>
		<img src={icon} class="-translate-x-1/4 size-16 inline-block w-auto aspect-square" alt="riskBuster Icon" />
		<span class="font-bold text-2xl -ml-4">
			<span>risk</span><span class="text-red-900">Buster</span>
		</span>
	</button>
</header>
<div class="pt-24 relative">
{#each cves.cvelistv5 as [id, data]}
	<div class="p-4">
		<h2 class="text-lg font-semibold uppercase">CVE ID: {id}</h2>
		<p class="text-sm text-gray-600">State: {data.cveMetadata.state}</p>
		<p class="text-sm text-gray-600">Published: {formatDate(data.cveMetadata.datePublished)}</p>
		<p class="text-sm text-gray-600">Updated: {formatDate(data.cveMetadata.dateUpdated)}</p>
		<div class="mt-2">
			{#each data.containers.cna.descriptions as desc}
				<p class="text-gray-700">{desc.value}</p>
			{/each}
		</div>
		<h3 class="text-md font-semibold mt-4">Affected Products:</h3>
		<ul class="list-disc list-inside">
			{#each data.containers.cna.affected.filter(({ product }) => product !== 'n/a') as affected, i}
				<li>
					{affected.vendor} - {affected.product} (Versions: {#each affected.versions as version}{version.version}
						({version.status}){#if data.containers.cna.affected.length - 1 !== i },
						{/if}{/each})
				</li>
			{/each}
		</ul>
		{#if data.containers.cna.affected.every((affected) => affected.product === 'n/a')}
			<p class="text-gray-500">No affected products available.</p>
		{/if}
		<h3 class="text-md font-semibold mt-4">References:</h3>
		<ul class="list-disc list-inside">
			{#each data.containers.cna.references as ref}
				{#if ref.url}
					<li>
						<a href={ref.url} target="_blank" class="text-blue-500 underline">{truncateText(ref.name || ref.url)}</a>
					</li>
				{:else}
					<li>{ref.name}</li>
				{/if}
			{/each}
		</ul>
	</div>
{/each}
</div>
<div class="flex flex-col items-center justify-center mb-4">
	<button on:click={onWrong} class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 my-auto">
		Wrong Hardware?
	</button>
</div>