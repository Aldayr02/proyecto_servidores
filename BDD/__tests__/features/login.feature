Feature: Standard Login
  As a user
  I want to log in using my username and password
  So that I can access my account securely

  Scenario: Successful login
    Given the user is on the login page
    When the user enters their valid username and password
    When the user clicks on the login button
    Then the user should be redirected to the homepage
