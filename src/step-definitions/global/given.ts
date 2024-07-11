import { Given } from "@wdio/cucumber-framework";
import currentPage from "../../support/libs/current-page";

/**
 * @step Step the define page
 */
Given("I now on the {string} page", currentPage);
