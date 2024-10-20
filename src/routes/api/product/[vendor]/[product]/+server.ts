import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async({ params, fetch }) => {
	const { vendor, product } = params
	const res = await fetch(`https://vulnerability.circl.lu/api/search/${vendor?.toLowerCase()}/${product?.replace(/\s/g, '_').toLowerCase()}`)
	const data: CVEList = await res.json()
	data.cvelistv5.map(cve => cve[1].vendor = vendor ?? '')
	return json(data)
}