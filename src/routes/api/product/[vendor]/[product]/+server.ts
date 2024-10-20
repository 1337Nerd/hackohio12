import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async({ params, fetch }) => {
	const { vendor, product } = params
	console.log(vendor, product)
	const res = await fetch(`https://vulnerability.circl.lu/api/search/${vendor?.toLowerCase()}/${product?.replace(/\s/g, '_').toLowerCase()}`)
	const data = await res.json()
	return json(data)
}