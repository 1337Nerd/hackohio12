<script lang="ts">
	import '../app.css';
	import type { Action } from 'svelte/action';
	let cveData: CVEList | { vendor: string, products: string[] }
	let error = '';
	const videoHandler: Action<HTMLVideoElement> = async (node) => {
		if (!navigator.mediaDevices?.getUserMedia) {
			error = 'Camera not supported';
			return;
		}
		if (!('BarcodeDetector' in globalThis)) {
			error = 'Barcode scanner not supported';
			return;
		}
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: 'environment',
				width: { ideal: window.innerHeight },
				height: { ideal: window.innerWidth }
			},
			audio: false
		});
		let animationFrameId: number;
		node.srcObject = stream;
		const supported = await BarcodeDetector.getSupportedFormats();
		const scanner = new BarcodeDetector({ formats: supported });
		const detectBarcode = async () => {
			try {
				if (node.readyState > 1) {
					const codes = await scanner.detect(node);
					if (!codes.length) error = '';
					else {
						console.log('detected', codes.map((code) => code.rawValue).toString());
						error = codes.map((code) => code.rawValue).toString();
						const res = await fetch(`/api/barcode/${codes[0].rawValue}`);
						cveData = await res.json();
						console.log('cveData is', cveData);
						cancelAnimationFrame(animationFrameId);
						node.classList.add('hidden');
						return;
					}
				}
			} catch (e) {
				console.log(e);
			}
			animationFrameId = requestAnimationFrame(detectBarcode);
		};
		detectBarcode();
		return {
			destroy() {
				stream.getTracks().forEach((track) => track.stop());
				cancelAnimationFrame(animationFrameId);
			}
		};
	};
	let loading = false;
	let search = '';
	$: filteredData = cveData?.products
		?.map((cve) => cve.toLowerCase().replace(/_/g, ' '))
		.filter((cve) => cve.includes(search?.toLowerCase()));
	async function searchProduct(product: string) {
		loading = true;
		const res = await fetch(`/api/product/${cveData.vendor}/${product}`);
		const data = await res.json();
		console.log(data);
		cveData = data;
		loading = false;
	}
</script>

{#if cveData?.vendor}
	<div class="bg-gray-100 min-h-screen">
		<header class="bg-white p-4 shadow-md fixed w-full">
			<div class="relative">
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
			<div class="mb-4 flex justify-between items-center mt-[4.5rem]">
				<span class="text-gray-700 font-semibold">{filteredData.length} results</span>
				<button class="text-red-600 font-semibold">Clear all</button>
			</div>
			<div class="space-y-4">
				{#each filteredData as product}
					<button
						on:click={() => searchProduct(product)}
						type="button"
						class="bg-white p-4 min-h-32 rounded-lg shadow flex flex-row justify-between w-full"
					>
						<h2 class="text-lg font-semibold capitalize text-left h-full my-auto">{product}</h2>
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
{:else if cveData}
	{#each cveData.cvelistv5 as temp}
		{#each temp.filter(cve => typeof cve !== 'string') as cve}
			{@const vulnerability = cve.containers?.cna.descriptions}
			{@const referencesList = cve.containers?.cna.references}
			<div class="p-8">
				{#each vulnerability as { value }}
					{value}
				{/each}
				{#each referencesList as { url }}
					<div class="p-1">
						{url}
					</div>
				{/each}
			</div>
		{/each}
	{/each}
{:else}
	<video use:videoHandler class="size-full" class:hidden={cveData} autoplay muted />
	{error}
{/if}
