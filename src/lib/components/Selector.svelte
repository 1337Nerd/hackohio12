<script lang="ts">
	export let onSelect: (vendor: string, product: string) => Promise<void>
	export let onReset
	export let cveList: { vendor: string, products: string[] }
	import icon from '$lib/icon.png?url'
	let search = ''
	$: filteredData = cveList.products.map((cve) => cve).filter((cve) => cve.toLowerCase().includes(search?.toLowerCase()))
</script>
<div class="bg-gray-100 min-h-screen">
	<header class="bg-white p-4 shadow-md fixed w-full flex items-center">
		<button type="button" on:click={onReset}>
			<img src={icon} class="-translate-x-1/4 size-16 inline-block w-auto aspect-square" alt="riskBuster Icon" />
		</button>
		<div class="relative flex-grow">
			<input
				bind:value={search}
				type="text"
				placeholder="What can we help you find?"
				class="w-full bg-gray-200 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
			<span class="absolute right-3 top-2 text-gray-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</span>
		</div>
	</header>
	<main class="p-4">
		<div class="mb-4 flex justify-between items-center mt-24">
			<span class="text-gray-700 font-semibold">{filteredData.length} results</span>
			<button type="button" on:click={() => search = ''} disabled={search === ''} class="text-red-600 disabled:text-gray-400 font-semibold">Clear all</button>
		</div>
		<div class="space-y-4">
			{#each filteredData as product}
				<button
					on:click={() => onSelect(cveList.vendor, product)}
					type="button"
					class="bg-white p-4 min-h-32 rounded-lg shadow flex flex-row justify-between w-full"
				>
					<h2 class="text-lg font-semibold capitalize text-left h-full my-auto">{product.replace(/_/g, ' ')}</h2>
					<div class="text-red-600 px-4 py-2 h-full my-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 float-right"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</div>
				</button>
			{/each}
		</div>
	</main>
</div>