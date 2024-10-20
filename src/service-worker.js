import { version } from '$service-worker'
const CACHE = `cache-${version}`
self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE)
				await caches.delete(key)
		}
	}
	event.waitUntil(deleteOldCaches())
})
self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET')
		return
	async function respond() {
		const url = new URL(event.request.url)
		const cache = await caches.open(CACHE)

		try {
			const response = await fetch(event.request)
			if (response.ok)
				await cache.put(event.request, response.clone())
			return response
		}
		catch {
			return cache.match('event.request')
		}
	}
	event.respondWith(respond())
})