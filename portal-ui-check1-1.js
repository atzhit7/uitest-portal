const playwright = require('playwright');
const fs = require('fs');
const process = require('process');

(async () => {
  // start する前に config を read する。node だからできること。
  // ほかコマンドラインのパラメーターの受け渡しも可能
  // inputjson, url, user, password, browsers, --head, --notification
  // repository でまとめて管理
  let inputjson = '';
  let headlessflag = true;
  let baseURL = '';
  let user = '';
  let userpassword = '';
  let notification = false;
  let scshocnt = 0;
  let browserType = ''

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
      browserType =  arg.split("=")[1]
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

  const { hostname } = new URL(baseURL);
  

  const browser = await playwright[browserType].launch({
    headless: headlessflag,
    slowMo: 3000
  })
  const context = await browser.newContext({
    locale: 'ja-JP',
    ignoreHTTPSErrors: true
  })

  // 結果的に、変な class つけられてることになるので、そこを追うくらいなら、
  // 自動で走らせることを考えれば waittimeout で時間をおいておけばいい気もしてきたな・・・

  // Open new page
  const page = await context.newPage();

  // Go to https://agent1081final.esrij.com/portal/home/
  await page.goto(baseURL + '/home/');
  await page.route(baseURL + '/home/pages/Account/accept_conditions.html#client_id=arcgisonline&redirect_url=' + baseURL + '/home/', route => route.abort());
  
  // Click text="OK"
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;

  // ログインメッセージがある場合
  if (notification) {
    await page.click('text="OK"');
  };

  // Click text="サイン イン"
  await page.click('text="サイン イン"');

  // Fill input[aria-label="ユーザー名"]
  await page.waitForSelector('button#signIn', { state: 'visible' });
  await page.fill('input[aria-label="ユーザー名"]', user);
  // Press Tab
  await page.press('input[aria-label="ユーザー名"]', 'Tab');
  // Fill input[aria-label="パスワード"]
  await page.fill('input[aria-label="パスワード"]', userpassword);
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="サイン イン"
  await page.click('text="サイン イン"');

  // Click //a[normalize-space(.)='メンバー' and normalize-space(@role)='tab']
  await page.waitForSelector('main .trailer-half', {state: 'attached'});
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;

  await page.click('//a[normalize-space(.)=\'メンバー\' and normalize-space(@role)=\'tab\']');

  // Click //a[normalize-space(.)='ライセンス' and normalize-space(@role)='tab']
  await page.waitForSelector('div .loader-bars', {state: 'hidden'});
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;

  await page.click('//a[normalize-space(.)=\'ライセンス\' and normalize-space(@role)=\'tab\']');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?#licenses');

  await page.waitForSelector('div .loader-bars', {state: 'hidden'});
  await page.click('text="ユーザー タイプ"');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;

  // Click //a[normalize-space(.)='ステータス' and normalize-space(@role)='tab']
  await page.click('//a[normalize-space(.)=\'ステータス\' and normalize-space(@role)=\'tab\']');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?#status');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  
  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();