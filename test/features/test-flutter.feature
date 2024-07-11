Feature: Test Flutter

    Scenario: Test Flutter
        Given I now on the 'home' page
        Then I check flutter in field "counter" value equals "0"
        When I click button native "icon"
        Then I check flutter in field "counter" value equals "1"
