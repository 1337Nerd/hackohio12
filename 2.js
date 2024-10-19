import { connect } from 'puppeteer-real-browser'

(async () => {
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
        console.log('help-1');
        const {browser, page} = response
        await page.goto('https://www.barcodelookup.com/998390023207', {
            waitUntil: "domcontentloaded",
        });
        console.log("   help -2     ");

        
            console.log("help0");
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const quoteList = page.$eval('h4', text => text.textContent);
            

            console.log("help1");
            // Convert the quoteList to an iterable array
            // For each quote fetch the text and author
            // return Array.from(quoteList).map((quote) => {
            //   // Get the sub-elements from the previously fetched quote element
            //   const text = quote.querySelector("h4");
            // const fdsa = page.$eval(
            //     'h4',
            //     ((el) => el.textContent));
        
            //   const author = quote.querySelector(".author").innerText;
            // console.log("help");
            // console.log(text);
        
            
            //   return { text };
            // });


        const val1 = await quoteList;
        console.log(val1);
        //   return quoteList.PromiseResult;
        
        
    })
    .catch(error=>{
        console.log(error.message)
    })
  })();