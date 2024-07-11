import { Then } from '@wdio/cucumber-framework';
import verifyElementExist from '../../support/checks/verifyElementExist';
import verifyReturnEnabled from '../../support/checks/verifyReturnEnabled';
import verifyGetText from '../../support/checks/verifyGetText';
import verifyTextRow from '../../support/checks/verifyTextRow';
import verifyEquals from '../../support/checks/verifyEquals';
import verifyNullOrNot from '../../support/checks/verifyNullOrNot';

/**
 * @step Step for verification element is exist and not exist
 */
Then(
	/^I check (text|native|flutter) this (exist|not exist) in field "(.+)"$/,
	verifyElementExist,
);
/**
 * @step Step for the verification element is return true
 */
Then(/^I check (text|native) in field "(.+)" is true$/, verifyReturnEnabled);
/**
 * @step Step for the verification element get text is exist
 */
Then(
	/^I check (native|flutter) in field "(.+)" value is (exist|not exist)$/,
	verifyGetText,
);
/**
 * @step Step for the verification text row datatable
 */
Then(/^I check text row value is (exist|not exist)$/, verifyTextRow);
/**
 * @step Step for the verification element equals text expected
 */
Then(
	/^I check (native|flutter) in field "(.+)" value equals "(.+)"$/,
	verifyEquals,
);
/**
 * @step Step for the verification element is null or not null
 */
Then(
	/^I check (native|flutter) in field "(.+)" is (null|not null)$/,
	verifyNullOrNot,
);
