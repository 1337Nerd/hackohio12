<script lang="ts">
	export let cves: CVEList
</script>
{#each cves.cvelistv5 as temp}
	{#each temp.filter(cve => typeof cve !== 'string') as cve}
		{@const { cna } = cve.containers}
		{@const { descriptions, references } = cna}
		<div class="p-8">
			{#each descriptions as { value }}
				{value}
			{/each}
			{#each references as { url }}
				<a class="text-blue-500 block" href={url}>{url}</a>
			{/each}
		</div>
	{/each}
{/each}