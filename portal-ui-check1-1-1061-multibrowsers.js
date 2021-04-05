const playwright = require('playwright');
const fs = require('fs');
const process = require('process');

(async () => {
  // start する前に config を read する。node だからできること。
  // ほかコマンドラインのパラメーターの受け渡しも可能
  // inputjson, url, user, password, browsers, --head, --notification
  // repository でまとめて管理
  let inputjson = ''
  let headlessflag = true
  let baseURL = ''
  let user = ''
  let userpassword = ''
  let notification = false
  let tryBrowserTypes = ''

  for (let i = 0; i < process.argv.length; i++) {
    let arg = process.argv[i];
    console.log(arg);
    if (arg.includes('inputjson')) {
      inputjson = arg.split("=")[1];
      console.log(inputjson)
    }
    if (arg.includes('url')) {
      baseURL = arg.split("=")[1];
    }
    if (arg.includes('user')) {
      user = arg.split("=")[1];
    }
    if (arg.includes('password')) {
      userpassword = arg.split("=")[1];
    }
    if (arg.includes("--head")) {
      headlessflag = false;
    }
    if (arg.includes("--notification")) {
      notification = true;
    }
    if (arg.includes("browsers")) {
      tryBrowserTypes =  arg.split("=")[1]
    }
  }

  if (inputjson !== '') {
    let fileContents = fs.readFileSync(inputfile, 'utf8');
    let config = JSON.parse(fileContents);
    baseURL = config.initialurl
    user = config.user
    userpassword = config.userpassword
    notification = config.notification
  }

  const browserTypes = tryBrowserTypes.split(",")

  const { hostname } = new URL(baseURL)
  console.log(hostname)

  for (const browserType of browserTypes){
    let scshocnt = 0
    const browser = await playwright[browserType].launch({
      headless: headlessflag,
      slowMo: 3000
    })
  
    const context = await browser.newContext({
      locale: 'ja-JP',
      ignoreHTTPSErrors: true
    })
  
    const page = await context.newPage()
    
    await page.goto(baseURL+'/home/')
    
    await page.waitForSelector('.clearfix > #header #login-link')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    await page.click('.clearfix > #header #login-link')
    
    await navigationPromise
    let frames = await page.frames()
    const frame_119 = frames.find(f => f.url() === baseURL + '/sharing/rest/oauth2/authorize?client_id=arcgisonline&redirect_uri=' + baseURL +'/home/postsignin.html&response_type=token&display=iframe&parent=https://'+ hostname + '&expiration=20160&locale=ja')
    await frame_119.waitForSelector('.formContainer > #oauth > #fieldSet #user_username')
    
    await frame_119.click('.formContainer > #oauth > #fieldSet #user_username')
    await frame_119.fill('.formContainer > #oauth > #fieldSet #user_username', user)
    await frame_119.click('.formContainer > #oauth > #fieldSet #user_password')
    await frame_119.fill('.formContainer > #oauth > #fieldSet #user_password', userpassword)
    await frame_119.waitForSelector('#fieldSet > #ago-form #signIn')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    await frame_119.click('#fieldSet > #ago-form #signIn')
  
    await navigationPromise
  
    await page.waitForSelector('#organization-control-div #organization-view-status-button_label')
    await page.click('#organization-control-div #organization-view-status-button_label')
    // goto status page
    await navigationPromise
  
    await page.waitForSelector('#tabContainer_tablist #tabContainer_tablist_usersTab')
    await page.click('#tabContainer_tablist #tabContainer_tablist_usersTab')
    
    await page.waitForSelector('#tabContainer_tablist #tabContainer_tablist_itemsTab')
    await page.click('#tabContainer_tablist #tabContainer_tablist_itemsTab')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
  
    await page.waitForSelector('#tabContainer_tablist #tabContainer_tablist_usersTab')
    await page.click('#tabContainer_tablist #tabContainer_tablist_usersTab')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('#tabContainer_tablist #tabContainer_tablist_groupsTab')
    await page.click('#tabContainer_tablist #tabContainer_tablist_groupsTab')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
  
    // back to org
    await page.waitForSelector('.container_16 #pNavOrg')
    await page.click('.container_16 #pNavOrg')
    
    await navigationPromise
    // goto license
    await page.waitForSelector('#organization-manage-licenses-span #organization-manage-licenses-button_label')
    await page.click('#organization-manage-licenses-span #organization-manage-licenses-button_label')
    await navigationPromise
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
  
    await page.waitForSelector('#header #siteHeader-myContent')
    await page.click('#header #siteHeader-myContent')
    await navigationPromise
    await page.waitForTimeout(5000)
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
  
    await page.waitForSelector('#header #siteHeader-groups')
    await page.click('#header #siteHeader-groups')
    await navigationPromise
    await page.waitForTimeout(5000)
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('#header #siteHeader-gallery')
    await page.click('#header #siteHeader-gallery')
    await navigationPromise
    await page.waitForTimeout(5000)
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
  
    // Close page
    await page.close();
    
    // ---------------------
    await context.close();
    await browser.close();
  }
})()