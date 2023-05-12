import { byValueKey, byType } from 'appium-flutter-finder';

export const homeApp: { [key: string]: string } = {
    counter: byValueKey('counter'),
    icon : byType('Icon')
}
