@suit3
Feature: GET and POST methods of GraphQL

  Scenario: GET - Get a Post query
    Given the user hits the get a post query
    Then the user validates the response of the get a post query

  Scenario: DELETE - Delete a Post mutation
    Given the user hits the delete a post mutation for id 101
    Then the user validates the response of the delete a post mutation
