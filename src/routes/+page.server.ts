import manifest from '$lib/manifest.webmanifest?url'
export const prerender = true
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return {
		manifest
	}
}