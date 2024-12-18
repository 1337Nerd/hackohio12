import { json, type RequestHandler } from '@sveltejs/kit'
import { search } from 'fast-fuzzy'
async function getVendor(vendor: string) {
	const res = await fetch(`https://vulnerability.circl.lu/api/browse/${encodeURIComponent(vendor.toLowerCase())}`)
	const data = await res.json()
	return data
}

function findClosest(targetProduct: string, products: string[]) {
	return search(targetProduct, products, { returnMatchData: true })
}

async function findVulns(vendor: string, key: string) {
	const res = await fetch(`https://vulnerability.circl.lu/api/search/${encodeURIComponent(vendor.toLowerCase())}/${encodeURIComponent(key.toLowerCase())}`)
	const data: CVEList = await res.json()
	data.cvelistv5.forEach(cve => { cve[1].vendor = vendor; cve[1].product = key })
	return data
}

export const GET: RequestHandler = async({ params, fetch, platform }) => {
	const { upc } = params
	if (!upc)
		return new Response(null, { status: 404 })
	const res = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`)
	try {
		const testData = await res.json()
		const { brand, title } = testData.items[0]
		const products = await getVendor(brand)
		const targetProduct = (title).replaceAll(brand, '').replace(/\s+-\s+.*$/gi, '').trim()
		const closest = findClosest(targetProduct, products)
		if (closest.length === 0)
			return json({ vendor: brand, products })
		const cve = await findVulns(brand, closest[0].original)
		return json(cve)
	}
	catch {
		return json({ vendor: '', products: [] })
	}
}