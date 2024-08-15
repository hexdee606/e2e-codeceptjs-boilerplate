@suit2
Feature: REST API GET, POST, and DELETE Operations

  Scenario: POST - Create user account
    When the user hits the create account API with the following details:
      | username  | firstName | lastName | email              | password     | phone      |
      | testusers | tests     | users    | testusers@test.com | testpassword | 9999999999 |
    Then the user should validate a 200 response code

  Scenario: GET - User Account Details
    When the user hits the GET user account details API for "testusers"
    Then the user should validate a response and the following details:
      | username  | firstName | lastName | email              | password     | phone      |
      | testusers | tests     | users    | testusers@test.com | testpassword | 9999999999 |

  Scenario: DELETE - User Account Details
    When the user hits the DELETE user account details API for "testusers"
    Then the user should validate a 200 response code