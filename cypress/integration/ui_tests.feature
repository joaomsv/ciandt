Feature: Cases

    10 Cases for the ciandt challenge.
    site: http://automationpractice.com/

    # Scenario: Create User
    #     Given I visit 'http://automationpractice.com/' site
    #     And no user has signed in
    #     When I create a new account with the following information:
    #         | Email              | Title | First name | Last name | Password | Date of Birth    | Address      | City   | State         | Zip/Postal Code | Country       | Mobile phone | Assign an address alias for future reference |
    #         | test1@joaotest.com | Mr.   | Joao       | Vieira    | 12345    | February-04-1993 | Av. Test 123 | Revere | Massachusetts | 02151           | United States | 31999328099  | Home                                         |
    #     Then the new user should be successfully created
    #     And be redirected to the My Account screen

    Scenario: Sign in
        Given I visit 'http://automationpractice.com/' site
        And no user has signed in
        When request to sign in with the following information:
            | Email                  | Password |
            | joaomarcossv@gmail.com | 12345    |
        Then the user should be successfully signed in
        And be redirected to the My Account screen

    Scenario: Sign out
        Given I visit 'http://automationpractice.com/' site
        And I have signed in
            | Email                  | Password |
            | joaomarcossv@gmail.com | 12345    |
        When request to sign out
        Then the user should be successfully signed out

# Scenario: Change my password
#     Given that the 'http://automationpractice.com/' site is availble
#     When I have signed in
#     And access my personal information
#     And change my password
#     Then the system should display the message 'Your personal information has been successfully updated.'

# Scenario: Contact customer service
#     Given that the 'http://automationpractice.com/' site is availble
#     When I access the Contact Us page
#     And fill in the following information:
#         | Subject Heading  | Email address          | Order reference | Message |
#         | Customer service | joaomarcossv@gmail.com | 123             | Test    |
#     Then the system should display the message 'Your message has been successfully sent to our team.'

# Scenario: Add item to wishlist
#     Given that the 'http://automationpractice.com/' site is availble
#     And I have signed in
#     When I search for a blouse
#     And add the first item to my wishlist
#     Then the system should display the message 'Added to your wishlist.'
#     And the item should be successfully added to my wishlist

# Scenario: Compare 2 items
#     Given that the 'http://automationpractice.com/' site is availble
#     When I search for a dress
#     And choose 2 itens to compare
#     Then the 2 chosen items should be displayed in the product comparison page

# Scenario: Add item to cart
#     Given that the 'http://automationpractice.com/' site is availble
#     When search for an item
#     And add item to cart
#     Then a modal should appear with the item's information
#     And the system should display the message 'Product successfully added to your shopping cart'
#     And the selected item should be successfully added to cart

# Scenario: Add new address
#     Given that the 'http://automationpractice.com/' site is availble
#     And I have signed in
#     When I access my addresses
#     And add a new address with the following information:
#         | First name | Last name | Address     | City   | State         | Zip/Postal Code | Country       | Mobile phone | Please assign an address title for future reference. |
#         | Joao       | Test      | 123 Fun St. | Boston | Massachusetts | 01234           | United States | 0123456789   | Work                                                 |
#     Then the new address should be successfully added to the my addresses page
# Scenario: Purchase an item