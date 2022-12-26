// @ts-check
const { test, expect } = require('@playwright/test');
const { default: LoginPage } = require('../components/LoginPage');
const { default: SettingsPage } = require('../components/SettingsPage');

test('upload profile photo', async ({ page, baseURL }) => {
  const settingsPage = new SettingsPage(page)
  const loginPage = new LoginPage(page)
  await settingsPage.visit(baseURL)
  await loginPage.fillEmail(loginPage.email)
  await loginPage.fillPassword(loginPage.password)
  await loginPage.clickLoginButton()
  await expect(page).toHaveURL(`${baseURL}/me/settings/account`)
  await settingsPage.uploadImage()
  await settingsPage.clickSubmitButton()
  await expect(settingsPage.getAvatarImg).toBeVisible()
});
