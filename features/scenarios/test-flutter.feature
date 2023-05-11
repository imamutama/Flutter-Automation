Feature: Test Flutter 

@test-flutter
Scenario: Test flutter
Given user is on "homeApp" page
When Verify first count index from text counter
When user taps on "icon" button
Then Verify last count index after tap from text counter