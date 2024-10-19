import { connect } from 'puppeteer-real-browser'

async function getData(ID)  {
    connect({

        headless: 'auto',
    
        args: [],
    
        customConfig: {},
    
        skipTarget: [],
    
        fingerprint: false,
    
        turnstile: true,
    
        connectOption: {},
    
        tf: true,
    
        // proxy:{
        //     host:'<proxy-host>',
        //     port:'<proxy-port>',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
        // }
    
    })
    .then(async response => {
        const {browser, page} = response
        await page.goto('https://www.barcodelookup.com/' + ID, {
            waitUntil: "domcontentloaded",
        });
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const quoteList = page.$eval('h4', text => text.textContent);

            const val1 =  await quoteList;
            

       
        console.log(await quoteList + "    AHAHGLKHKJLAKHG    ");

        await page.close();

        return val1;
    })
    .catch(error=>{
        console.log(error.message)
    })
  };
  getData(998390023207);
