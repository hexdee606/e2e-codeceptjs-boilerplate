@suit1
Feature: User Registration

  Background:
    Given the user is on the homepage

  Scenario Outline: Register a new user
    When the user clicks on the " Signup / Login" button
    Then the user should be on the login and signup page
    When the user signs up with the name "<name>" and email "<email>"
    And the user clicks on the "Signup" button
    And the user fills in the required information
    When the user clicks on the "Create Account" button
    Then the user should see the "Account Created!" confirmation message
    When the user clicks on the "Continue" button
    Then the user should be logged in as "<name>"
    When the user clicks on the " Delete Account" button
    Then the user should see the "Account Deleted!" confirmation message
    Examples:
      | name        | email                  |
      | test user 1 | test_user_one@test.com |
