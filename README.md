# Event Management System API

This API is designed for managing events, users, and their respective data with a focus on scalability, built using Express.js and MongoDB. It provides endpoints for CRUD operations on events, user management, authentication, and more.

## Key Features

- **Event Management**: Perform Create, Read, Update, and Delete (CRUD) operations on events.
- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Access Control**: Admins have full control over users and events, while regular users can manage only their own events.
- **Event Filtering**: Ability to search and filter events based on various parameters like date, type, and location.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- BcryptJS for password encryption
- Mongoose ORM for MongoDB interaction

## API Endpoints

### Event Management

- `POST /api/event/create-event`
- `DELETE /api/event/delete-event/:eventId`
- `GET /api/event/get-attendance`
- `POST /api/event/attendance/:eventId`
- `POST /api/event/reg-event/:eventId`
- `GET /api/event/get-details/:eventId`
- `GET /api/event/get-all-details`
- `PUT /api/event/update-event/:eventId`
- `DELETE /api/event/delete-reg/:eventId`

### User Management

- `POST /api/user/reg-user`
- `POST /api/user/login-user`
- `GET /api/user/get-details`
- `GET /api/user/get-all-details`
- `DELETE /api/user/delete-user`

### Venue Management

- `POST /api/venue/create-venue`
- `GET /api/venue/get-details/:venueId`
- `GET /api/venue/get-all-details`
- `PUT /api/venue/update-venue/:venueId`
- `DELETE /api/venue/delete-venue/:venueid`

## Middleware

- **Access Logging**: Logs every incoming request to track access and security.
- **Role-based Authorization**: Ensures that users can only access the endpoints they're authorized to, based on their roles.

## Security Features

- **Event Conflict Prevention**: Ensures that events do not clash in timing or resources.
- **Hierarchical Role System**: Four levels of hierarchy (Admin, Organizer, User) to manage permissions.
- **Role Assignment Restrictions**: Only Admins can assign roles and modify user details.
  
## Installation Guide

1. Clone the repository:

   1. Clone this repository:

   ```bash
   git clone https://github.com/nithashifana/book-myevent.git
   cd book-myevent

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and set the required environment variables (e.g., `MONGO_URI`, `JWT_SECRET`, etc.).

4. Start the server

   ```bash
   npm start
   ```

## License

This project is licensed under the [MIT LICENSE](LICENSE)
