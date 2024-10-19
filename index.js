import puppeteer from "puppeteer";
import puppeteerExtra from 'puppeteer-extra';
import Stealth from 'puppeteer-extra-plugin-stealth';

// TODO: Now it's your turn to improve the scraper and make him get more data from the Quotes to Scrape website.
// Here's a list of potential improvements you can make:
// - Navigate between all pages using the "Next" button and fetch the quotes on all the pages
// - Fetch the quote's tags (each quote has a list of tags)
// - Scrape the author's about page (by clicking on the author's name on each quote)
// - Categorize the quotes by tags or authors (it's not 100% related to the scraping itself, but that can be a good improvement)

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

puppeteerExtra.use(Stealth());

const browserObj = await puppeteerExtra.launch();
const newpage = await browserObj.newPage();

await newpage.setViewport();

await newpage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');

await newpage.goto('https://www.barcodelookup.com/998390023207');
await newpage.waitForNetworkIdle();

await newpage.screenshot({ path: 'screenshot_stealth.png'});


  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.barcodelookup.com/998390023207", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await newpage.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    const quoteList = document.querySelectorAll("col-50 product-details");

    // Convert the quoteList to an iterable array
    // For each quote fetch the text and author
    return Array.from(quoteList).map((quote) => {
      // Get the sub-elements from the previously fetched quote element
      const text = quote.querySelector("h4");
    // const fdsa = page.$eval(
    //     'h4',
    //     ((el) => el.textContent));

    //   const author = quote.querySelector(".author").innerText;

    console.log(text);
      return { text };
    });
  });

  // Display the quotes
//   const text = page.$eval(
//     'h4',
//     ((el) => el.textContent));
console.log(quotes[0]);

  // Click on the "Next page" button
//   await page.click(".pager > .next > a");

  // Close the browser
//   await browser.close();
};

// Start the scraping
getQuotes();