import { When } from "@wdio/cucumber-framework";
import clickElements from "../../support/actions/clickElements";
import setInputField from "../../support/actions/setInputField";
import setInputType from "../../support/actions/setInputType";
import clickIndex from "../../support/actions/clickIndex";
import clearInputField from "../../support/actions/clearInputField";
import pause from "../../support/actions/pause";
import swipe from "../../support/actions/swipe";
import tapBack from "../../support/actions/tapBack";
import tapEnter from "../../support/actions/tapEnter";
import currentPage from "../../support/libs/current-page";
import setInputRow from "../../support/actions/setInputRow";
import clearInputType from "../../support/actions/clearInputType";

/**
 * @step Step for click the button
 */
When(/^I click button (text|native|flutter) "(.+)"$/, clickElements);

When(/^I click button index "(.+)" in text "(.+)"$/, clickIndex);
/**
 * @step Step for set input value
 */
When(/^I set (native|flutter) value "(.+)" in field "(.+)"$/, setInputField);

When(/^I set type value "(.+)" in field "(.+)" and "(.+)"$/, setInputType);

When(
  /^I set (native|flutter) value row data table in field "(.+)"$/,
  setInputRow
);

/**
 * @step Step for clear value
 */
When(/^I clear (native|flutter) in field "(.+)"$/, clearInputField);

When(/^I clear type in "(.+)" and "(.+)"$/, clearInputType);
/**
 * @step Step for waiting or pause
 */
When(/^I waiting loding for "(.+)" seconds$/, pause);
/**
 * @step Step for the swipe gesture
 */
When(/^I swipe (up|down|right|refresh|refreshMission) on page$/, swipe);
/**
 * @steo Step for back with keysend code
 */
When(/^I back with keysend code$/, tapBack);
/**
 *  @step Step for enter with the keysend code
 */
When(/^I enter with keysend code$/, tapEnter);
