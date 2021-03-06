
# Technical assessment

Address Book & Contacts application using the following technologies:
- Front-end written in HTML, CSS and JavaScript (you can use any JS based framework, like Angular, React, etc. But no library for CSS or components). 
- Use any State Management library you like.
- Mock the api of https://randomuser.me/ and use the mocked api to get the data of the first contact in the application.
- At least 70% code coverage of your components code unit-tested
- Commit the assignment to github (or other git repo) for later review.
- Deploy the project, so the reviewer can see the end result (this can go outside the 4 hour time of the assignment)

Functional wise it should be possible to:
- Visualize multiple contacts on an overview page with 2 different statuses ("Work" or "Private").
- Show at least the name, email, phone number and status of each contact.
- Add a new contact.
- Delete a contact.
- Edit a contact.
- The state of the contacts and the contact list should still be available after reloading the application. After reloading you no longer need to call the api if there are already contacts in the list.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

http://localhost:4200

## Unit-tests

```bash
$ ng test --no-watch --code-coverage
```

## Online demo

- https://www.due-volte.nl/ssan/qlgy


