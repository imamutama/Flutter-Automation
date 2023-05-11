import { swipeAtCoordinates } from './gestures'
import { byText } from 'appium-flutter-finder';

class Action {

    // ===============================================================
    // Function action for step definition automation mobile super apps
    // ===============================================================

    // Action for wait element byKeyValue or byType.
    async waitForElement(locator: string) {
        try {
            const element = await driver.execute('flutter:waitFor', locator, 100)
            return element
        } catch {
            throw new Error(`is element "${locator}" cannot found this selector`)
        }
    }

    // Action for wait element tappable byKeyValue or byType
    async waitForElementTappable(locator: string) {
        try {
            const element = await driver.execute('flutter:waitForTappable', locator)
            return element
        } catch {
            throw new Error(`is element "${locator}" not compatible for tap`)
        }
    }

    // Action for wait element text byText
    async waitForText(text: string) {
        try {
            const element = await driver.execute('flutter:waitFor', byText(text), 100)
            return element
        } catch {
            throw new Error(`is text "${text}" cannot found this selector`)
        }
    }

    // Action for wait tappable element text byText
    async waitForTextTappable(text: string) {
        try {
            const element = await driver.execute('flutter:waitForTappable', byText(text))
            return element
        } catch {
            throw new Error(`is text "${text}" not compatible for tap`)
        }
    }

    // Action for tap on element byKeyValue or byType
    async tap(locator: string) {
        await this.waitForElementTappable
        await driver.elementClick(locator)
    }

    // Action for clear text element byKeyValue or byType
    async clearText(locator: string) {
        await driver.elementClear(locator)
    }

    // Action for input element byKeyValue or byType
    async input(locator: string, inputText: string) {
        await driver.elementSendKeys(locator, inputText)
    }

    // Action for get text element byKeyValue or byType
    async getText(locator: string) {
        return driver.getElementText(locator)
    }

    // Action for tap on byText
    async tapByText(text: string) {
        await this.waitForTextTappable(text)
        await driver.elementClick(byText(text))
    }

    // Action for scroll element byType or byKeyValue
    async scrollElement(locator: string) {
        driver.execute('flutter:scroll', locator, {
            dx: 50, dy: -100, durationMilliseconds: 200, frequency: 30
        })
    }

    // Action for validate text cannot null 
    async validateNotEmpty(locator: string) {
        await expect(this.getText).not.toBeNull()
    }

    // Action for scroll until visible element byType or byKeyValue
    async scrollUntilVisible(locatorX: string, locatorY: string) {
        driver.execute('flutter:scrollUntilVisible', locatorX, {
            item: locatorY, dxScroll: 90, dyScroll: -400
        })
    }

    async getNumberFromRp(text: string) {
        if (text.includes('.')) {
            let value: number = +(text.substring(text.indexOf('p') + 1).replace(/\./g, ''))
            return value
        } else if (text.includes(',')) {
            let value: number = +(text.substring(text.indexOf('p') + 1).replace(/,/g, ''))
            return value
        }
    }

    async getNumberFromString(text: string) {
        let value: number = +(text.replace(/\./g, ''))
        return value
    }

    public getEnv(envName: string) {
        let value = <string>process.env[envName]
        if ((value === undefined) || (value === '')) {
            throw new Error(`'${envName}' not defined / have no value in .env file!`)
        }
        return value
    }

    async tapBackDevice() {
        await driver.pressKeyCode(4)
    }

    // async scrollDownToElement(locator: string) {
    //     const maxSwipeCount = 7
    //     for (let i = 0; i < maxSwipeCount; i++) {
    //         if (await this.isVisibleElement(locator)) {
    //             return
    //         }
    //         await this.swipeUp()
    //     }
    // }

    // async scrollUpToElement(locator: string) {
    //     const maxSwipeCount = 7
    //     for (let i = 0; i < maxSwipeCount; i++) {
    //         if (await this.isVisibleElement(locator)) {
    //             return
    //         }
    //         await this.swipeDown()
    //     }
    // }

    // async scrollDownAndTapText(text: string) {
    //     const maxSwipeCount = 7
    //     for (let i = 0; i < maxSwipeCount; i++) {
    //         if (!await this.isTextVisible(text)) {
    //             await this.swipeUp()
    //             await driver.pause(3000)
    //         } else {
    //             await this.tapByText(text)
    //             break
    //         }
    //     }
    // }
    // async selectDropdown(locator: string, text: string) {
    //     await this.tap(locator)
    //     if (await this.isTextVisible(text)==false) {
    //         await this.scrollDownAndTapText(text)
    //     } else {
    //         await this.tapByText(text)
    //     }
    // }



}

export default new Action()

