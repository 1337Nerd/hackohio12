import { connect } from 'puppeteer-real-browser'

export async function getData(id: string)  {
	const browser = await connect({ turnstile: true })
	const { page } = browser
	await page.goto(`https://www.barcodelookup.com/${id}`, { waitUntil: 'domcontentloaded' })
	const quoteElement = await page.$('h4')
	const textContent = await quoteElement?.evaluate(el => el.textContent)
	console.log(textContent)
	await page.close()
}
// getData('998390023207') //pixel 4a phone