const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://bi-ej.maps.arcgis.com/home/index.html
  await page.goto('https://bi-ej.maps.arcgis.com/home/index.html');

  // Go to https://bi-ej.maps.arcgis.com/home/signin.html?returnUrl=https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Findex.html
  await page.goto('https://bi-ej.maps.arcgis.com/home/signin.html?returnUrl=https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Findex.html');

  // Go to https://bi-ej.maps.arcgis.com/sharing/rest/oauth2/authorize?client_id=arcgisonline&display=default&response_type=token&state=%7B%22returnUrl%22%3A%22https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Findex.html%22%2C%22useLandingPage%22%3Afalse%7D&expiration=20160&locale=ja-jp&redirect_uri=https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Faccountswitcher-callback.html&force_login=false&hideCancel=true&showSignupOption=true&canHandleCrossOrgSignIn=true&signuptype=esri&redirectToUserOrgUrl=true
  await page.goto('https://bi-ej.maps.arcgis.com/sharing/rest/oauth2/authorize?client_id=arcgisonline&display=default&response_type=token&state=%7B%22returnUrl%22%3A%22https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Findex.html%22%2C%22useLandingPage%22%3Afalse%7D&expiration=20160&locale=ja-jp&redirect_uri=https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Faccountswitcher-callback.html&force_login=false&hideCancel=true&showSignupOption=true&canHandleCrossOrgSignIn=true&signuptype=esri&redirectToUserOrgUrl=true');

  // Click input[aria-label="ユーザー名"]
  await page.click('input[aria-label="ユーザー名"]');

  // Fill input[aria-label="ユーザー名"]
  await page.fill('input[aria-label="ユーザー名"]', 'Atsuhito.N');

  // Press Tab
  await page.press('input[aria-label="ユーザー名"]', 'Tab');

  // Fill input[aria-label="パスワード"]
  await page.fill('input[aria-label="パスワード"]', 'noam1125');

  // Press a with modifiers
  await page.press('input[aria-label="パスワード"]', 'Control+a');

  // Fill input[aria-label="パスワード"]
  await page.fill('input[aria-label="パスワード"]', 'noam1125');

  // Click text="サイン イン"
  await page.click('text="サイン イン"');
  // assert.equal(page.url(), 'https://bi-ej.maps.arcgis.com/home/accountswitcher-callback.html#access_token=XbAUk6GMXugqZNH2WkxfJqE2hcwJmpr7MAovstYJHn6dpXAtAmyNjneWQTnQPa0xQ9dAFeEbzbXqRsjBc_Uy7uPJe8xBVVevai642KEjU_H3uJ3BuswJ5sg9Z_Rc7Y_5dk6hJa9SxxXuZTexfUM2kXdcZq1vQUw0fYum5pD7awxCizbJKdTUrLSJGowBKZz7hRRYu2yWSPsDG3DCDFcOqC2mCTfO64KF8rYJqVykMkE.&expires_in=1209600&username=Atsuhito.N&ssl=true&state=%7B%22returnUrl%22%3A%22https%3A%2F%2Fbi-ej.maps.arcgis.com%2Fhome%2Findex.html%22%2C%22useLandingPage%22%3Afalse%7D');

  // Go to https://bi-ej.maps.arcgis.com/home/accountswitcher-callback.html#
  await page.goto('https://bi-ej.maps.arcgis.com/home/accountswitcher-callback.html#');

  // Go to https://bi-ej.maps.arcgis.com/home/index.html
  await page.goto('https://bi-ej.maps.arcgis.com/home/index.html');

  // Click //button[normalize-space(@aria-label)='アプリ ランチャー']/span/span
  await page.click('//button[normalize-space(@aria-label)=\'アプリ ランチャー\']/span/span');

  // Click //a[normalize-space(.)='Insights']
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('//a[normalize-space(.)=\'Insights\']')
  ]);

  // Go to https://insights.arcgis.com/#access_token=lEBdzlPqcJua5SgZhaXR5ztwDmV0_acNAijPW8s8EL7Lp3Hy6emJI73uqZe-B6PdAgupeclZuNc_SOOktLBBQecZXKCeXXs279cwvOrtdJ_zGnWqT-4gGfaIXsuAOtWo_xm0e_HO53LXdPbeU0bKwkjmlQ8zAsAgliPkO3pJU7vtcw_uox69MGNGbxmvVu4SHOnA2QRVPxPTTE09zYjzINK6y7H95arqzA6gLwL6lhA.&expires_in=1209479&username=Atsuhito.N&ssl=true&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Fwww.arcgis.com%22%7D
  await page1.goto('https://insights.arcgis.com/#access_token=lEBdzlPqcJua5SgZhaXR5ztwDmV0_acNAijPW8s8EL7Lp3Hy6emJI73uqZe-B6PdAgupeclZuNc_SOOktLBBQecZXKCeXXs279cwvOrtdJ_zGnWqT-4gGfaIXsuAOtWo_xm0e_HO53LXdPbeU0bKwkjmlQ8zAsAgliPkO3pJU7vtcw_uox69MGNGbxmvVu4SHOnA2QRVPxPTTE09zYjzINK6y7H95arqzA6gLwL6lhA.&expires_in=1209479&username=Atsuhito.N&ssl=true&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Fwww.arcgis.com%22%7D');

  // Go to https://insights.arcgis.com/#
  await page1.goto('https://insights.arcgis.com/#');

  // Go to https://insights.arcgis.com/#/
  await page1.goto('https://insights.arcgis.com/#/');

  // Click //div[normalize-space(.)='ワークブック' and normalize-space(@role)='link']
  await page1.click('//div[normalize-space(.)=\'ワークブック\' and normalize-space(@role)=\'link\']');

  // Click //div[normalize-space(.)='モデル' and normalize-space(@role)='link']
  await page1.click('//div[normalize-space(.)=\'モデル\' and normalize-space(@role)=\'link\']');

  // Click //div[normalize-space(.)='データセット' and normalize-space(@role)='link']
  await page1.click('//div[normalize-space(.)=\'データセット\' and normalize-space(@role)=\'link\']');

  // Click //div[normalize-space(.)='接続' and normalize-space(@role)='link']
  await page1.click('//div[normalize-space(.)=\'接続\' and normalize-space(@role)=\'link\']');

  // Click //div[normalize-space(.)='ページ' and normalize-space(@role)='link']
  await page1.click('//div[normalize-space(.)=\'ページ\' and normalize-space(@role)=\'link\']');

  // Click //div[normalize-space(.)='テーマ' and normalize-space(@role)='link']
  await page1.click('//div[normalize-space(.)=\'テーマ\' and normalize-space(@role)=\'link\']');

  // Click span[role="application"] div[role="link"]
  await page1.click('span[role="application"] div[role="link"]');

  // Click img[alt="ヘルプ"]
  await page1.click('img[alt="ヘルプ"]');

  // Click text="Insights について"
  await page1.click('text="Insights について"');

  // Click img[alt="閉じる"]
  await page1.click('img[alt="閉じる"]');

  // Click img[alt="ヘルプ"]
  await page1.click('img[alt="ヘルプ"]');

  // Click text="Insights へようこそ"
  await page1.click('text="Insights へようこそ"');

  // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
  await page1.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');

  // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
  await page1.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');

  // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
  await page1.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');

  // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
  await page1.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');

  // Click //a[normalize-space(.)='次へ' and normalize-space(@role)='button']/span[1]
  await page1.click('//a[normalize-space(.)=\'次へ\' and normalize-space(@role)=\'button\']/span[1]');

  // Click text="完了"
  await page1.click('text="完了"');

  // Close page
  await page1.close();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();