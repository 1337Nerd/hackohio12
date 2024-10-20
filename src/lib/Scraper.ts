import { connect } from 'puppeteer-real-browser'

export async function getData(id: string)  {
    connect({

        args: [],
    
        customConfig: {},
    
        turnstile: true,
    
        connectOption: {},
    
        // proxy:{
        //     host:'<proxy-host>',
        //     port:'<proxy-port>',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
        // }
    
    })
    .then(async response => {
        const {browser, page} = response
        await page.goto('https://www.barcodelookup.com/' + id, {
            waitUntil: "domcontentloaded",
        });
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const quoteList = page.$eval('h4', text => text.textContent);

            const val1 =  await quoteList;
            

       
        console.log(await quoteList);

        await page.close();

        return val1;
    })
    .catch(error=>{
        console.log(error.message)
    })
  };
 // getData('998390023207'); //pixel 4a phone
