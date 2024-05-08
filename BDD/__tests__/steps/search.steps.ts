import { defineFeature, loadFeature } from 'jest-cucumber';
import { WebDriver, By, until } from 'selenium-webdriver';
import { Builder } from 'selenium-webdriver';
import * as path from 'path';

const feature = loadFeature(path.resolve(__dirname, '../features/login.feature'));

defineFeature(feature, test => {
    test('Successful login', ({ given, when, then }) => {
        let driver: WebDriver;
        beforeAll(async () => {
            driver = await new Builder().forBrowser('chrome').build();
        });

        given('the user is on the login page', async () => {
            await driver.get('http://localhost:3000/users/login');
        });

        when('the user enters their valid username and password', async () => {
            await driver.findElement(By.id('emailInputLogin')).sendKeys('uziel@email.com');
            await driver.findElement(By.id('passwordInputLogin')).sendKeys('123456');
        });

        when('the user clicks on the login button', async () => {
            await driver.findElement(By.id('loginSubmit')).click();
        });

        then('the user should be redirected to the homepage', async () => {
            await driver.wait(until.urlContains('http://localhost:3000/users/login'), 10000);
        });

        afterAll(async () => {
            await driver.quit();
        });
    });
});