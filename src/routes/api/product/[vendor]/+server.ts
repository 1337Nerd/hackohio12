import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async({ params, fetch }) => {
	const { vendor } = params
	if (!vendor)
		return new Response(null, { status: 404 })
	const res = await fetch(`https://vulnerability.circl.lu/api/browse/${encodeURIComponent(vendor?.toLowerCase())}`)
	const data = await res.json()
	return json(data)
}