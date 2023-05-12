import { Then, When } from "@wdio/cucumber-framework";
import action from "../helper/action-page";
import { homeApp } from '../page-objects/flutter-page';
import { byValueKey, byType } from 'appium-flutter-finder';

When(/^Verify first count index from text counter$/, async () => {
  expect(await action.getText(homeApp.counter)).toEqual('0')
})

Then(/^Verify last count index after tap from text counter$/, async () => {
  expect(await action.getText(homeApp.counter)).toEqual('1')
})