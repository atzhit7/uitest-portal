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

  const icnt = 0;
  const savepath = './result/';

  // Go to https://agent1081final.esrij.com/portal/home/
  await page.goto(baseURL+'/home/');
  await page.route(baseURL + '/home/pages/Account/accept_conditions.html#client_id=arcgisonline&redirect_url=' + baseURL + '/home/', route => route.abort());
  
  // Click text="OK"
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
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
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="サイン イン"
  await page.click('text="サイン イン"');

  // **
  // 組織の設定一覧表示 START
  // **
  // What happened without await syntax...
  page.click('//a[normalize-space(.)=\'設定\' and normalize-space(@role)=\'tab\']');
  // Click text="ホーム ページ"
  await page.click('text="ホーム ページ"');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;

  // Click div[id="main-content-area"] >> text="ギャラリー"
  await page.click('div[id="main-content-area"] >> text="ギャラリー"');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=gallery#settings');
  

  await page.click('div[id="main-content-area"] >> text="全般"');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;

  // Click div[id="main-content-area"] >> text="マップ"
  await page.click('div[id="main-content-area"] >> text="マップ"');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=map#settings');

  // Click text="アイテム"
  await page.click('text="アイテム"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=items#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click div[id="main-content-area"] >> text="グループ"
  await page.click('div[id="main-content-area"] >> text="グループ"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=groups#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="ユーティリティ サービス"
  await page.click('text="ユーティリティ サービス"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=utilityServices#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="ArcGIS Online"
  await page.click('text="ArcGIS Online"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=agol#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // scroll page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Click text="サーバー"
  await page.click('text="サーバー"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=servers#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="メンバー ロール"
  await page.click('text="メンバー ロール"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=memberRoles#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="新しいメンバーのデフォルト設定"
  await page.click('text="新しいメンバーのデフォルト設定"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=newMemberDefaults#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="コラボレーション"
  await page.click('text="コラボレーション"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=collaborations#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="セキュリティ"
  await page.click('text="セキュリティ"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=security#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // Click text="組織エクステンション"
  await page.click('text="組織エクステンション"');
  // assert.equal(page.url(), baseURL + '/home/organization.html?tab=orgExtensions#settings');
  await page.screenshot({ path: './'+scshocnt+'.png', fullPage: true });
  scshocnt += 1;
  // **
  // 組織の設定一覧表示 END
  // **
  
  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();