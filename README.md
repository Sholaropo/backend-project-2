# Employee & Branch Management API

## Overview
The Employee & Branch Management API is designed to facilitate the management of branches and employees within an organization. This API provides endpoints to create, retrieve, update, and delete branch and employee records.

## Features
- Manage branches (Create, Read, Update, Delete)
- Manage employees (Create, Read, Update, Delete)
- Filter employees by branch and department
- validation
- Comprehensive API documentation via Swagger

---

## Installation Instructions

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Firebase project for Firestore database

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Sholaropo/backend-project-2.git
   cd backend-project-2
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   SWAGGER_SERVER_URL=http://localhost:3000/api/v1
   ```

4. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```

The API will now be running at `http://localhost:3000`.

---

## Example Usage
```ts
const fetchEmployees = async () => {
  const response = await fetch("http://localhost:3000/api/v1/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
};
fetchEmployees();
```

### Example API Requests
#### 1. Create a Branch
```ts
fetch("http://localhost:3000/api/v1/branches", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "New York Branch", location: "New York, USA" })
});
```

#### 2. Get All Employees
```ts
fetch("http://localhost:3000/api/v1/employees").then(res => res.json()).then(console.log);
```

#### 3. Update an Employee
```ts
fetch("http://localhost:3000/api/v1/employees/123", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Updated Name" })
});
```

#### 4. Delete a Branch
```ts
fetch("http://localhost:3000/api/v1/branches/123", {
  method: "DELETE"
});
```

---

## API Documentation
### Public Documentation
The API documentation is available at:
🔗 [Public API Docs](https://sholaropo.github.io/assignment-5-documentation/)

### Access OpenAPI Locally
To view the OpenAPI documentation in Swagger UI:
1. Start the server (`npm start`)
2. Open `http://localhost:3000/api-docs` in your browser

---

## Secure Setup Instructions
### Managing Sensitive Information
- Never commit `.env` files to your repository.
- Use environment variables to store API keys and sensitive credentials.
- For production, use a secrets manager or cloud environment variable service.

---

## Contribution
Feel free to submit issues or contribute via pull requests.

