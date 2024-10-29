<script lang="ts">
	export let cves: CVEList
	export let onWrong
	export let onReset
	import icon from '$lib/icon.png?url'
	import ShareButton from './ShareButton.svelte'
	let shareModal: HTMLDialogElement | undefined
	function formatDate(date: string) {
		return new Date(date).toLocaleDateString()
	}
	function truncateText(text: string) {
		if (text.length > 40)
			return `${text.slice(0, 40)}...`
		return text
	}
</script>
<header class="bg-white p-4 shadow-md fixed w-full flex items-center justify-between z-10">
	<button type="button" class="flex items-center" on:click={onReset}>
		<img src={icon} class="-translate-x-1/4 size-16 inline-block w-auto aspect-square" alt="riskBuster Icon" />
		<span class="font-bold text-2xl -ml-4">
			<span>risk</span><span class="text-red-900">Buster</span>
		</span>
	</button>
	<button type="button" class="flex items-center" on:click={() => shareModal?.showModal()}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
		</svg>
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
<dialog bind:this={shareModal} class="group pointer-events-none open:pointer-events-auto opacity-0 invisible open:visible open:opacity-100 grid transition-[opacity,backdrop-filter,visibility] fixed inset-0 backdrop:[transition:backdrop-filter_.5s_ease] backdrop-blur-sm bg-black/20 h-full w-full z-40 max-h-none max-w-none overflow-y-hidden">
	<div class="h-full overflow-y-auto">
		<div class="motion-safe:animate-closeModal motion-safe:group-open:animate-openModal fixed top-auto bottom-0 z-50 bg-gray-200 w-full rounded-t-2xl shadow [--tw-shadow:0px_-0.2px_0.2px_theme(colors.modal-shadow),-0.1px_-1.2px_1.4px_-0.4px_theme(colors.modal-shadow),-0.2px_-2.2px_2.5px_-0.7px_theme(colors.modal-shadow),-0.3px_-3.7px_4.2px_-1.1px_theme(colors.modal-shadow),-0.5px_-5.8px_6.5px_-1.4px_theme(colors.modal-shadow),-0.8px_-9.1px_10.3px_-1.8px_theme(colors.modal-shadow),-1.2px_-13.9px_15.7px_-2.1px_theme(colors.modal-shadow),-1.8px_-20.5px_23.2px_-2.5px_theme(colors.modal-shadow)] p-8 flex justify-around">
			<!--
			<ShareButton download="{cves.cvelistv5[0]}.csv" href="{URL.createObjectURL(new Blob([JSON.stringify(cves.cvelistv5.map(cve => cve))], { type: 'text/csv' }))}" name="CSV">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
				</svg>
			</ShareButton>
			-->
			<ShareButton download="{cves.cvelistv5[0][1].vendor}__{cves.cvelistv5[0][1].product}.json" href={URL.createObjectURL(new Blob([JSON.stringify(cves)], { type: 'application/json' }))} name="JSON">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
				</svg>
			</ShareButton>
			<!--
			<ShareButton download="{cves.cvelistv5[0]}.pdf" href="" name="PDF">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="currentColor" class="size-6">
					<path d="M64 464h48v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0h165.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V304h-48V160h-80c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16v384c0 8.8 7.2 16 16 16zm112-112h32c30.9 0 56 25.1 56 56s-25.1 56-56 56h-16v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-16v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-32c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-16v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V368z"/>
				</svg>
			</ShareButton>
			-->
		</div>
	</div>
	<form class="fixed inset-0 text-transparent" method="dialog">
		<button class="h-full w-full cursor-default" type="submit">Close</button>
	</form>
</dialog>