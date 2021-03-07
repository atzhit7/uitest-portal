const { firefox } = require('playwright');

(async () => {
  // start する前に config を read する。node だからできること。
  // repository でまとめて管理
  let fileContents = fs.readFileSync('./input.json', 'utf8');
  let config = JSON.parse(fileContents);

  const browser = await firefox.launch({
    headless: false,
    slowMo: 1000
  });
  const context = await browser.newContext({
    locale: 'ja-JP',
    ignoreHTTPSErrors: true
  });

  // 結果的に、変な class つけられてることになるので、そこを追うくらいなら、
  // 自動で走らせることを考えれば waittimeout で時間をおいておけばいい気もしてきたな・・・
  // await page.waitForTimeout(3000); 3 sec 待ち（Web の一般的なところ）

  // Open new page
  const page = await context.newPage();

  const icnt = 0;
  const savepath = './result/';

  // Go to https://agent1081final.esrij.com/portal/home/
  await page.goto(config.initialurl+'/home/');
  await page.route(config.initialurl + '/home/pages/Account/accept_conditions.html#client_id=arcgisonline&redirect_url=' + config.initialurl + '/home/', route => route.abort());
  
  // Click text="OK"
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './1.png', fullPage: true });
  // ログインメッセージがない場合（1-1 とどちらかができれば OK）
  // await page.click('text="OK"');

  // Login Phase
  // Click text="サイン イン"
  await page.waitForTimeout(3000);
  await page.click('text="サイン イン"');

  // Fill input[aria-label="ユーザー名"]
  await page.waitForTimeout(3000);
  await page.waitForSelector('button#signIn', { state: 'visible' });
  await page.fill('input[aria-label="ユーザー名"]', 'portaladmin');
  // Press Tab
  await page.press('input[aria-label="ユーザー名"]', 'Tab');
  // Fill input[aria-label="パスワード"]
  await page.fill('input[aria-label="パスワード"]', 'passw0rd');
  await page.screenshot({ path: './2.png', fullPage: true });
  // Click text="サイン イン"
  await page.click('text="サイン イン"');

  // Click //a[normalize-space(.)='メンバー' and normalize-space(@role)='tab']
  await page.waitForSelector('main .trailer-half', {state: 'attached'});
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './3.png', fullPage: true });

  await page.click('//a[normalize-space(.)=\'メンバー\' and normalize-space(@role)=\'tab\']');

  // Click //a[normalize-space(.)='ライセンス' and normalize-space(@role)='tab']
  await page.waitForSelector('div .loader-bars', {state: 'hidden'});
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './4.png', fullPage: true });

  await page.click('//a[normalize-space(.)=\'ライセンス\' and normalize-space(@role)=\'tab\']');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?#licenses');

  await page.waitForSelector('div .loader-bars', {state: 'hidden'});
  await page.waitForTimeout(3000);
  await page.click('text="ユーザー タイプ"');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './5.png', fullPage: true });

  // Click //a[normalize-space(.)='ステータス' and normalize-space(@role)='tab']
  await page.click('//a[normalize-space(.)=\'ステータス\' and normalize-space(@role)=\'tab\']');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?#status');
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: './6.png', fullPage: true });

  // **
  // 組織の設定一覧表示 START
  // **
  await page.click('//a[normalize-space(.)=\'設定\' and normalize-space(@role)=\'tab\']')
  // Click text="ホーム ページ"
  await page.click('text="ホーム ページ"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=homePage#settings');

  // Click div[id="main-content-area"] >> text="ギャラリー"
  await page.click('div[id="main-content-area"] >> text="ギャラリー"');
  
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=gallery#settings');

  // Click div[id="main-content-area"] >> text="マップ"
  await page.click('div[id="main-content-area"] >> text="マップ"');
  
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=map#settings');

  // Click text="アイテム"
  await page.click('text="アイテム"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=items#settings');

  // Click div[id="main-content-area"] >> text="グループ"
  await page.click('div[id="main-content-area"] >> text="グループ"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=groups#settings');

  // Click text="ユーティリティ サービス"
  await page.click('text="ユーティリティ サービス"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=utilityServices#settings');

  // Click text="ArcGIS Online"
  await page.click('text="ArcGIS Online"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=agol#settings');

  // scroll page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Click text="サーバー"
  await page.click('text="サーバー"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=servers#settings');

  // Click text="メンバー ロール"
  await page.click('text="メンバー ロール"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=memberRoles#settings');

  // Click text="新しいメンバーのデフォルト設定"
  await page.click('text="新しいメンバーのデフォルト設定"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=newMemberDefaults#settings');

  // Click text="コラボレーション"
  await page.click('text="コラボレーション"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=collaborations#settings');

  // Click text="セキュリティ"
  await page.click('text="セキュリティ"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=security#settings');

  // Click text="組織エクステンション"
  await page.click('text="組織エクステンション"');
  // assert.equal(page.url(), 'https://agent1081final.esrij.com/portal/home/organization.html?tab=orgExtensions#settings');

  // **
  // 組織の設定一覧表示 END
  // **
  
  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();