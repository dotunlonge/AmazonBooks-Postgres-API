# ExpressJS REST API with Authentication and CRUD Operations for Book Management

## Overview

This ExpressJS REST API provides CRUD (Create, Read, Update, Delete) functionalities for managing books and includes user authentication. It leverages PostgreSQL as the database and is built using Node.js with ExpressJS.

## Folder Structure

- `controller`: Contains request and response handling logic.
- `service`: Implements business logic.
- `repository`: Handles SQL or database query operations without business logic.
- `entity`: Contains database models.

Additionally, the server includes a `dist` folder holding transpiled files, a `migration` folder with database configuration and initialization files, and a `seed` folder for seeding the database.

## Installation and Setup

To install and run the server locally, follow these steps:

1. Clone the repository.
2. Setup and Install PostgreSQL n our system/service.
3. Install dependencies: `npm install`
4. Init the Database: `npm run createDB`
5. Seed the Database: `npm run seedDB`
6. Start the server: `npm start`

## Available API Routes

### Books

- **GET /books**: Retrieve paginated books.
- **GET /books/:id**: Retrieve a book by its ID.
- **POST /books**: Add a new book.
- **PUT /books/:id**: Update a book by its ID.
- **DELETE /books/:id**: Delete a book by its ID.
- **GET /books/tag/:tag**: Retrieve books by tag.

### Orders

- **POST /orders**: Create a new order.
- **DELETE /orders/:id**: Cancel an order by ID.
- **GET /orders/:id**: Retrieve an order by its ID.

### User

- **POST /user/signup**: Create a new user.
- **POST /user/login**: Login user.
- **POST /user/logout**: Logout user.

## Usage

- All routes requiring authentication need a valid token obtained from the login route.
- The routes support CRUD operations for books and user orders.

## Dependencies

- Node.js
- ExpressJS
- PostgreSQL

## Contributing

Contributions to improve the API are welcome. To contribute, please follow the guidelines in the CONTRIBUTING.md file.

## License

This project is licensed under the [License Name], see the LICENSE.md file for details.
