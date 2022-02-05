# Fullstack Microservice Assignment 1(Intern)

## Frontend

Create a singlepage web application which allows users to manage the content

Landing page consists of a sign up form with email and password as fields

- Both fields in sign up form should be required
- Implement inline field validation and indicate errors
- Enable sign up button only when all fields are filled with correct validations

After signup, use a dashboard to show all available content with title and likes

- Dashboard can fetch data from top contents api in content micro service.

Use persistent storage to store user id, which is returned on sign up. Use this as a check for login as well for the scope of this assignment, if user id is not present in persistent storage then show sign up form.

When the user clicks on a content the application should display on the same screen the following attributes: story content, title, likes and publishing date

User can like a content and it should reflect in the real time.

## Backend Microservices

2 micro services - content, user-interaction service.

### Content Service

Serving books as content. The content will have a story and title, considering the scope of this assignment.

Data ingestion should happen via csv, write a script to ingest data into the database( IdIdeally script should also be a part of your service). Content service should have at least the title, story, date published and the user id stored.

Top contents API - sorted on user-interaction[Sort on basis of Number of likes]

Testing- An API to help us post the csv file, and it should automatically invoke the data ingestion process once it receives the csv file.
User data should be sent to User Interaction Service and stored accordingly.

### User interaction service

Add Update API for User Like event(validate if user exists)

Add signup API for User which will take fields as userId and password

email address should consist of an email prefix and an email domain, both in acceptable formats.
password should follow following policy:

- a minimum of 1 upper case letter [A-Z] and
- a minimum of 1 lower case letter [a-z] and
- a minimum of 1 numeric character [0-9] and
- a minimum of 1 special character
- password must be at least 10 characters in length, but can be much longer.

return auto generated userId in response of this API and use it to validate user.
