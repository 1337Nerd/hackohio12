import { json, type RequestHandler } from '@sveltejs/kit'
import { search } from 'fast-fuzzy'
import { getData } from '$lib/Scraper'
const testData = {
	"products": [
		{
			"barcode_number": "998390023207",
			"barcode_formats": "UPC-A 998390023207, EAN-13 0998390023207",
			"mpn": "320-750471000114402",
			"model": "",
			"asin": "",
			"title": "Google Pixel 4a - New Unlocked Android Smartphone - 128 GB of Storage - up to.",
			"category": "",
			"manufacturer": "Google",
			"brand": "Google",
			"contributors": [],
			"age_group": "",
			"ingredients": "",
			"nutrition_facts": "",
			"energy_efficiency_class": "",
			"color": "",
			"gender": "",
			"material": "",
			"pattern": "",
			"format": "",
			"multipack": "",
			"size": "",
			"length": "",
			"width": "",
			"height": "",
			"weight": "",
			"release_date": "",
			"description": "EAN:0810029930147 Style: Bar RAM:6 GB Storage Capacity:128 GB Color: Black Features:[ 'Proximity Sensor', 'Barometer', 'Accelerometer', 'Fingerprint Sensor', 'Ambient Light Senso.",
			"features": [],
			"images": [
				"https://images.barcodelookup.com/24496/244967785-1.jpg"
			],
			"last_update": "2021-06-22 04:07:25",
			"stores": [
				{
					"name": "Newegg Business",
					"country": "US",
					"currency": "USD",
					"currency_symbol": "$",
					"price": "624.86",
					"sale_price": "",
					"tax": [],
					"link": "https://www.neweggbusiness.com/Product/Product.aspx?Item=9SIV2CAD5E1489",
					"item_group_id": "",
					"availability": "",
					"condition": "",
					"shipping": [],
					"last_update": "2021-06-22 03:34:01"
				}
			],
			"reviews": []
		}
	]
}

async function getVendor(vendor: string) {
	const res = await fetch(`https://vulnerability.circl.lu/api/browse/${vendor.toLowerCase()}`)
	const data = await res.json()
	return data
}

function findClosest(targetProduct: string, products: string[]) {
	console.log('target is', targetProduct)
	return search(targetProduct, products, { returnMatchData: true })
}

async function findVulns(key: string) {
	const res = await fetch(`https://vulnerability.circl.lu/api/search/${key}`)
	const data = await res.json()
	return data
}

export const GET: RequestHandler = async({ params, fetch }) => {
	const { upc } = params
	if (!upc)
		return new Response(null, { status: 404 })
	console.log('upc is', upc)
	const temp = await getData(upc)
	console.log('temp is', temp)
	const { manufacturer, model, title } = testData.products[0]
	console.log(manufacturer, model, title)
	const products = await getVendor(manufacturer)
	const targetProduct = (model || title).replaceAll(manufacturer, '')//.replace(/\s+-\s+.*$/gi, '').trim()
	const closest = findClosest(targetProduct, products)
	console.log('closest is', closest)
	if (closest.length === 0)
		return json({ vendor: manufacturer, products })
	const cve = await findVulns(`${manufacturer}/${closest[0].original}`)
	console.log('cve is', cve)
	return json(cve)
}