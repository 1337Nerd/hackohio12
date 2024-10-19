<script lang="ts">
	import '../app.css';
	import type { Action } from 'svelte/action';
	let cveData = {
		cvelistv5: [
			[
				'cve-2023-45866',
				{
					dataType: 'CVE_RECORD',
					dataVersion: '5.1',
					cveMetadata: {
						state: 'PUBLISHED',
						cveId: 'CVE-2023-45866',
						assignerOrgId: '8254265b-2729-46b6-b9e3-3dfca2d5bfca',
						assignerShortName: 'mitre',
						dateUpdated: '2024-08-02T20:29:32.567Z',
						dateReserved: '2023-10-14T00:00:00',
						datePublished: '2023-12-08T00:00:00'
					},
					containers: {
						cna: {
							providerMetadata: {
								orgId: '8254265b-2729-46b6-b9e3-3dfca2d5bfca',
								shortName: 'mitre',
								dateUpdated: '2024-01-05T13:06:14.377607'
							},
							descriptions: [
								{
									lang: 'en',
									value:
										'Bluetooth HID Hosts in BlueZ may permit an unauthenticated Peripheral role HID Device to initiate and establish an encrypted connection, and accept HID keyboard reports, potentially permitting injection of HID messages when no user interaction has occurred in the Central role to authorize such access. An example affected package is bluez 5.64-0ubuntu1 in Ubuntu 22.04LTS. NOTE: in some cases, a CVE-2020-0556 mitigation would have already addressed this Bluetooth HID Hosts issue.'
								}
							],
							affected: [
								{
									vendor: 'n/a',
									product: 'n/a',
									versions: [
										{
											version: 'n/a',
											status: 'affected'
										}
									]
								}
							],
							references: [
								{
									url: 'https://bluetooth.com'
								},
								{
									url: 'http://changelogs.ubuntu.com/changelogs/pool/main/b/bluez/bluez_5.64-0ubuntu1/changelog'
								},
								{
									url: 'https://github.com/skysafe/reblog/tree/main/cve-2023-45866'
								},
								{
									url: 'https://git.kernel.org/pub/scm/bluetooth/bluez.git/commit/profiles/input?id=25a471a83e02e1effb15d5a488b3f0085eaeb675'
								},
								{
									name: 'FEDORA-2023-6a3fe615d3',
									tags: ['vendor-advisory'],
									url: 'https://lists.fedoraproject.org/archives/list/package-announce%40lists.fedoraproject.org/message/D2N2P5LMP3V7IJONALV2KOFL4NUU23CJ/'
								},
								{
									name: 'FEDORA-2023-26a02512e1',
									tags: ['vendor-advisory'],
									url: 'https://lists.fedoraproject.org/archives/list/package-announce%40lists.fedoraproject.org/message/77YQQS5FXPYE6WBBZO3REFIRAUJHERFA/'
								},
								{
									url: 'https://support.apple.com/kb/HT214036'
								},
								{
									url: 'https://support.apple.com/kb/HT214035'
								},
								{
									name: '20231212 APPLE-SA-12-11-2023-4 macOS Sonoma 14.2',
									tags: ['mailing-list'],
									url: 'http://seclists.org/fulldisclosure/2023/Dec/9'
								},
								{
									name: '20231212 APPLE-SA-12-11-2023-2 iOS 17.2 and iPadOS 17.2',
									tags: ['mailing-list'],
									url: 'http://seclists.org/fulldisclosure/2023/Dec/7'
								},
								{
									name: '[debian-lts-announce] 20231215 [SECURITY] [DLA 3689-1] bluez security update',
									tags: ['mailing-list'],
									url: 'https://lists.debian.org/debian-lts-announce/2023/12/msg00011.html'
								},
								{
									name: 'DSA-5584',
									tags: ['vendor-advisory'],
									url: 'https://www.debian.org/security/2023/dsa-5584'
								},
								{
									name: 'GLSA-202401-03',
									tags: ['vendor-advisory'],
									url: 'https://security.gentoo.org/glsa/202401-03'
								}
							],
							problemTypes: [
								{
									descriptions: [
										{
											type: 'text',
											lang: 'en',
											description: 'n/a'
										}
									]
								}
							]
						},
						adp: [
							{
								providerMetadata: {
									orgId: 'af854a3a-2127-422b-91ae-364da2661108',
									shortName: 'CVE',
									dateUpdated: '2024-08-02T20:29:32.567Z'
								},
								title: 'CVE Program Container',
								references: [
									{
										url: 'https://bluetooth.com',
										tags: ['x_transferred']
									},
									{
										url: 'http://changelogs.ubuntu.com/changelogs/pool/main/b/bluez/bluez_5.64-0ubuntu1/changelog',
										tags: ['x_transferred']
									},
									{
										url: 'https://github.com/skysafe/reblog/tree/main/cve-2023-45866',
										tags: ['x_transferred']
									},
									{
										url: 'https://git.kernel.org/pub/scm/bluetooth/bluez.git/commit/profiles/input?id=25a471a83e02e1effb15d5a488b3f0085eaeb675',
										tags: ['x_transferred']
									},
									{
										name: 'FEDORA-2023-6a3fe615d3',
										tags: ['vendor-advisory', 'x_transferred'],
										url: 'https://lists.fedoraproject.org/archives/list/package-announce%40lists.fedoraproject.org/message/D2N2P5LMP3V7IJONALV2KOFL4NUU23CJ/'
									},
									{
										name: 'FEDORA-2023-26a02512e1',
										tags: ['vendor-advisory', 'x_transferred'],
										url: 'https://lists.fedoraproject.org/archives/list/package-announce%40lists.fedoraproject.org/message/77YQQS5FXPYE6WBBZO3REFIRAUJHERFA/'
									},
									{
										url: 'https://support.apple.com/kb/HT214036',
										tags: ['x_transferred']
									},
									{
										url: 'https://support.apple.com/kb/HT214035',
										tags: ['x_transferred']
									},
									{
										name: '20231212 APPLE-SA-12-11-2023-4 macOS Sonoma 14.2',
										tags: ['mailing-list', 'x_transferred'],
										url: 'http://seclists.org/fulldisclosure/2023/Dec/9'
									},
									{
										name: '20231212 APPLE-SA-12-11-2023-2 iOS 17.2 and iPadOS 17.2',
										tags: ['mailing-list', 'x_transferred'],
										url: 'http://seclists.org/fulldisclosure/2023/Dec/7'
									},
									{
										name: '[debian-lts-announce] 20231215 [SECURITY] [DLA 3689-1] bluez security update',
										tags: ['mailing-list', 'x_transferred'],
										url: 'https://lists.debian.org/debian-lts-announce/2023/12/msg00011.html'
									},
									{
										name: 'DSA-5584',
										tags: ['vendor-advisory', 'x_transferred'],
										url: 'https://www.debian.org/security/2023/dsa-5584'
									},
									{
										name: 'GLSA-202401-03',
										tags: ['vendor-advisory', 'x_transferred'],
										url: 'https://security.gentoo.org/glsa/202401-03'
									}
								]
							}
						]
					}
				}
			]
		]
	};
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
		{#each temp.filter((cve) => typeof cve !== 'string') as cve}
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
