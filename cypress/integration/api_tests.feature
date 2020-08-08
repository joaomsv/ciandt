Feature: API Tests

    API tests for the ciandt challenge.
    Host: https://jsonplaceholder.typicode.com/

    Scenario: Get users
        When I request a 'GET' from the host 'https://jsonplaceholder.typicode.com/users' with the body ''
        Then all users should have a name, username, and email
        And their Email should be valid
        And their Company catchphrase should have less than 50 characters

    Scenario: Post posts with user id from get
        When I request a POST with GET user id
        Then the post should be saved successfully

    Scenario: Post posts without title
        When I request a 'POST' from the host 'https://jsonplaceholder.typicode.com/posts' with the body '{ userId: 1, body: "test body" }'
        Then the post should not be saved successfully