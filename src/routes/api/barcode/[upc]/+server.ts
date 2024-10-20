import { json, type RequestHandler } from '@sveltejs/kit'
import { search } from 'fast-fuzzy'
async function getVendor(vendor: string) {
	const res = await fetch(`https://vulnerability.circl.lu/api/browse/${vendor.toLowerCase()}`)
	const data = await res.json()
	return data
}

function findClosest(targetProduct: string, products: string[]) {
	return search(targetProduct, products, { returnMatchData: true })
}

async function findVulns(vendor: string, key: string) {
	const res = await fetch(`https://vulnerability.circl.lu/api/search/${vendor}/${key}`)
	const data: CVEList = await res.json()
	data.cvelistv5.map(cve => cve[1].vendor = vendor)
	return data
}

export const GET: RequestHandler = async({ params, fetch, platform }) => {
	const { upc } = params
	if (!upc)
		return new Response(null, { status: 404 })
	const res = await fetch(`https://api.barcodelookup.com/v3/products?barcode=${upc}&formatted=y&key=${platform?.env?.API_KEY}`)
	const testData = await res.json()
	const { manufacturer, model, title } = testData.products[0]
	const products = await getVendor(manufacturer)
	const targetProduct = (model || title).replaceAll(manufacturer, '').replace(/\s+-\s+.*$/gi, '').trim()
	const closest = findClosest(targetProduct, products)
	if (closest.length === 0)
		return json({ vendor: manufacturer, products })
	const cve = await findVulns(manufacturer, closest[0].original)
	return json(cve)
}