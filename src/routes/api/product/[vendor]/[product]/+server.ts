import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async({ params, fetch }) => {
	const { vendor, product } = params
	if (!vendor || !product)
		return new Response(null, { status: 404 })
	const res = await fetch(`https://vulnerability.circl.lu/api/search/${encodeURIComponent(vendor?.toLowerCase())}/${encodeURIComponent(product?.toLowerCase())}`)
	const data: CVEList = await res.json()
	data.cvelistv5.forEach(cve => cve[1].vendor = vendor ?? '')
	return json(data)
}