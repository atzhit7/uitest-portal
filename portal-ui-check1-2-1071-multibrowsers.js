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
  let browserTypes = []

  for (let i = 0; i < process.argv.length; i++) {
    let arg = process.argv[i];
    console.log(arg);
    if (arg.includes('inputjson')) {
      inputjson = arg.split("=")[1];
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
      browserTypesarg =  arg.split("=")[1]
    }
  }

  browserTypes = browserTypesarg.split(",")

  if (inputjson !== '') {
    let fileContents = fs.readFileSync(inputfile, 'utf8');
    let config = JSON.parse(fileContents);
    baseURL = config.initialurl
    user = config.user
    userpassword = config.userpassword
    notification = config.notification
  }

  for (const browserType of browserTypes){
    let scshocnt = 0
    
    const browser = await playwright[browserType].launch({
      headless: headlessflag,
      slowMo: 3000
    });
    const context = await browser.newContext({
      locale: 'ja-JP',
      ignoreHTTPSErrors: true
    });

    // 結果的に、変な class つけられてることになるので、そこを追うくらいなら、
    // 自動で走らせることを考えれば waittimeout で時間をおいておけばいい気もしてきたな・・・

    // Open new page
    const page = await context.newPage();

    const icnt = 0;
    const savepath = './result/';

    // Go to https://agent1081final.esrij.com/portal/home/
    await page.goto(baseURL+'/home/');
    await page.route(baseURL + '/home/pages/Account/accept_conditions.html#client_id=arcgisonline&redirect_url=' + baseURL + '/home/', route => route.abort());
    
    // Click text="OK"
    await page.waitForTimeout(3000);
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    // ログインメッセージがある場合
    if (notification) {
      await page.click('text="OK"');
    };

    // Login Phase
    // Click text="サイン イン"
    await page.click('text="サイン イン"');

    // Fill input[aria-label="ユーザー名"]
    await page.waitForSelector('button#signIn', { state: 'visible' });
    await page.fill('input[aria-label="ユーザー名"]', user);
    // Press Tab
    await page.press('input[aria-label="ユーザー名"]', 'Tab');
    // Fill input[aria-label="パスワード"]
    await page.fill('input[aria-label="パスワード"]', userpassword);
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    // Click text="サイン イン"
    await page.click('text="サイン イン"');

    // **
    // 組織の設定一覧表示 START
    // **
    // What happened without await syntax...
    page.click('//a[normalize-space(.)=\'設定\' and normalize-space(@role)=\'tab\']');

    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    // await page.waitForSelector('.js-content-wrapper > #dijit__WidgetsInTemplateMixin_0 > #tabcontent > #uniqName_2_0 > .padding-leader-2')
    // await page.click('.js-content-wrapper > #dijit__WidgetsInTemplateMixin_0 > #tabcontent > #uniqName_2_0 > .padding-leader-2')
    // await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    // scshocnt += 1;
    
    await page.waitForSelector('#dijit__WidgetsInTemplateMixin_0 > #dijit__TemplatedMixin_0 > .subnav-wrap > .subnav-links > .js-subnav-link:nth-child(5)')
    await page.click('#dijit__WidgetsInTemplateMixin_0 > #dijit__TemplatedMixin_0 > .subnav-wrap > .subnav-links > .js-subnav-link:nth-child(5)')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_1')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_1')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_2')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_2')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_3')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_3')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_4')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_4')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_5')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_5')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_6')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_6')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_7')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_7')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_8')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_8')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_9')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_9')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_10')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_10')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    
    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_11')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_11')
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;

    await page.waitForSelector('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_12')
    await page.click('.esriFloatLeading > #editTabs > #editTabs_tablist #editTabs_tablist_dijit_layout_ContentPane_12')
    // assert.equal(page.url(), baseURL + '/home/organization.html?tab=orgExtensions#settings');
    await page.screenshot({ path: './'+ browserType + scshocnt+'.png', fullPage: true });
    scshocnt += 1;
    // **
    // 組織の設定一覧表示 END
    // **
    
    // Close page
    await page.close();

    // ---------------------
    await context.close();
    await browser.close();
  }
})();