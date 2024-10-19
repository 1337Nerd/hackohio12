import puppeteerExtra from 'puppeteer-extra';
import puppeteer from 'puppeteer';
import Stealth from 'puppeteer-extra-plugin-stealth';

// const puppeteerExtra = puppeteerextra;
// const Stealth = puppeteer-extra-plugin-stealth;

puppeteerExtra.use(Stealth());

(async () => {
    const browserObj = await puppeteerExtra.launch();
    const newpage = await browserObj.newPage();

    await newpage.setViewport();

    await newpage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');

    await newpage.goto('https://www.barcodelookup.com/998390023207');
    await newpage.waitForNetworkIdle();

    await newpage.screenshot({ path: 'screenshot_stealth.png'});

    await browserObj.close();
})();
