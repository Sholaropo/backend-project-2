# Debugging Analysis

## Scenario 1: Environment variable management

-   **Breakpoint Location:** app.ts line 7
-   **Objective:** how dotenv loads the variables from the env file

### Debugger Observations

-   **Variable States:** portBefore = undefined, portAfter='3000'
-   **Call Stack:** file compile function, dotenv.config()
-   **Behavior:** process.env.PORT in initially undefined but after dotenv function is called it has a vlaue of 3000

### Analysis

-   What did you learn from this scenario?
    - dotenv.config() correctly loads environment variables from the .env file and assigns them to process.env.
    - Environment variables are not available by default unless explicitly loaded.
-   Did you observe any unexpected behavior? If so, what might be the cause?
    - No unexpected behavior was observed.
-   Are there areas for improvement or refactoring in this part of the code?
-   How does this enhance your understanding of the overall project?
    - shows the importance of environment variables for configuration management.

## Scenario 2: helmet integration

-   **Breakpoint Location:** branchController.ts line 19
-   **Objective:** how security headers are applied to enhance API protection

### Debugger Observations

-   **Variable States:** branches = {
  id: "IU6j5fD0gCsX5Ii3udUu",
  name: "Canada Branch",
  address: "Vancouver, Canada",
  phone: "12345678",
}
headers {
  "content-security-policy": "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
  "cross-origin-opener-policy": "same-origin",
  "cross-origin-resource-policy": "same-origin",
  "origin-agent-cluster": "?1",
  "referrer-policy": "no-referrer",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "x-content-type-options": "nosniff",
  "x-dns-prefetch-control": "off",
  "x-download-options": "noopen",
  "x-frame-options": "SAMEORIGIN",
  "x-permitted-cross-domain-policies": "none",
  "x-xss-protection": "0",
  "access-control-allow-origin": "*",
}
-   **Call Stack:** router, getAllBranches, next function
-   **Behavior:** 
    - When a request is made to fetch all branches, Helmet middleware applies security headers.

### Analysis

-   What did you learn from this scenario?
    - Helmet successfully adds multiple security headers to API responses, enhancing protection against common vulnerabilities.
-   Did you observe any unexpected behavior? If so, what might be the cause?
    - No unexpected behavior was observed.
-   Are there areas for improvement or refactoring in this part of the code?
-   How does this enhance your understanding of the overall project?
    - Highlights how Helmet protects against XSS, clickjacking, and other web security threats.

## Scenario 3: OpenAPI Documentation Integration

-   **Breakpoint Location:** swagger.ts line 7
-   **Objective:** Debugging how API documentation routes are generated and served to ensure accuracy and accessibility

### Debugger Observations

-   **Variable States:** specs {
  openapi: "3.0.0",
  info: {
    title: "Employee Directory and Branch Management API Documentations",
    version: "1.0.0",
    description: "This is the API documentation for the Employee Directory and Branch Management API",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Branch: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier for the branch",
            example: "branch_123abc",
          },
          name: {
            type: "string",
            description: "The name of the branch",
            example: "Downtown Branch",
          },
          address: {
            type: "string",
            description: "The address of the branch",
            example: "123 Main St, Lagos, Nigeria",
          },
          phone: {
            type: "string",
            description: "The contact phone number of the branch",
            example: "+2348012345678",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the branch was created",
            example: "2024-03-23T12:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the branch was last updated",
            example: "2024-03-23T12:30:00Z",
          },
        },
      },
      Employee: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier for the employee",
            example: "emp_456xyz",
          },
          name: {
            type: "string",
            description: "The full name of the employee",
            example: "John Doe",
          },
          position: {
            type: "string",
            description: "The job position of the employee",
            example: "Software Engineer",
          },
          department: {
            type: "string",
            description: "The department the employee belongs to",
            example: "IT",
          },
          email: {
            type: "string",
            format: "email",
            description: "The official email of the employee",
            example: "johndoe@example.com",
          },
          phone: {
            type: "string",
            description: "The contact phone number of the employee",
            example: "+2348023456789",
          },
          branchId: {
            type: "string",
            description: "The ID of the branch the employee is associated with",
            example: "branch_123abc",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the employee record was created",
            example: "2024-03-23T14:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "The date and time when the employee record was last updated",
            example: "2024-03-23T15:30:00Z",
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [
      ],
    },
  ],
  paths: {
    "/branches": {
      get: {
        summary: "Retrieve a list of all branches",
        description: "Fetch all branches from the database.",
        tags: [
          "Branch",
        ],
        responses: {
          "200": {
            description: "A list of branches retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Branch",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new branch",
        description: "Adds a new branch to the system.",
        tags: [
          "Branch",
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Branch",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Branch created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Branch",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/branches/{id}": {
      get: {
        summary: "Retrieve a branch by its ID",
        description: "Fetch a specific branch by its unique identifier.",
        tags: [
          "Branch",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique identifier of the branch",
            example: "branch_123abc",
          },
        ],
        responses: {
          "200": {
            description: "The branch details retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Branch",
                },
              },
            },
          },
          "404": {
            description: "Branch not found",
          },
        },
      },
      put: {
        summary: "Update an existing branch",
        description: "Updates the details of a specific branch by its ID.",
        tags: [
          "Branch",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique identifier of the branch",
            example: "branch_123abc",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Branch",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Branch updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Branch",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
          "404": {
            description: "Branch not found",
          },
        },
      },
      delete: {
        summary: "Delete a branch",
        description: "Removes a branch from the system by its ID.",
        tags: [
          "Branch",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique identifier of the branch",
            example: "branch_123abc",
          },
        ],
        responses: {
          "200": {
            description: "Branch deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Branch Deleted",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Branch not found",
          },
        },
      },
    },
    "/employees": {
      get: {
        summary: "Retrieve a list of employees",
        description: "Fetches all employees from the system.",
        tags: [
          "Employee",
        ],
        responses: {
          "200": {
            description: "A list of employees",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new employee",
        description: "Adds a new employee to the system.",
        tags: [
          "Employee",
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Employee",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Employee created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
          "400": {
            description: "Invalid input data",
          },
        },
      },
    },
    "/employees/{id}": {
      get: {
        summary: "Get an employee by ID",
        description: "Fetches a single employee by their unique identifier.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique identifier of the employee",
            example: "employee_123abc",
          },
        ],
        responses: {
          "200": {
            description: "Employee retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
          "404": {
            description: "Employee not found",
          },
        },
      },
      put: {
        summary: "Update an existing employee",
        description: "Modifies details of an existing employee.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique ID of the employee to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Employee",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Employee updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
          "400": {
            description: "Invalid input data",
          },
          "404": {
            description: "Employee not found",
          },
        },
      },
      delete: {
        summary: "Delete an employee",
        description: "Removes an employee from the system by their ID.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique ID of the employee to delete",
          },
        ],
        responses: {
          "200": {
            description: "Employee deleted successfully",
          },
          "400": {
            description: "Invalid employee ID",
          },
          "404": {
            description: "Employee not found",
          },
        },
      },
    },
    "/employees/branch/{branchId}": {
      get: {
        summary: "Get employees by branch",
        description: "Retrieves all employees that belong to a specific branch.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "branchId",
            required: true,
            schema: {
              type: "string",
            },
            description: "The unique identifier of the branch",
            example: "branch_123abc",
          },
        ],
        responses: {
          "200": {
            description: "Employees retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
          },
          "404": {
            description: "No employees found for the given branch",
          },
        },
      },
    },
    "/employees/department/{department}": {
      get: {
        summary: "Get employees by department",
        description: "Retrieves all employees belonging to a specific department.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "department",
            required: true,
            schema: {
              type: "string",
            },
            description: "The department name to filter employees",
            example: "Engineering",
          },
        ],
        responses: {
          "200": {
            description: "Employees retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
          },
          "404": {
            description: "No employees found in the given department",
          },
        },
      },
    },
  },
  tags: [
  ],
}
-   **Call Stack:** setupSwagger, 
-   **Behavior:** The API documentation should be served correctly via the Swagger middleware.

### Analysis

-   What did you learn from this scenario?
    - The API documentation structure follows OpenAPI 3.0.0 standards, ensuring comprehensive API exposure.
-   Did you observe any unexpected behavior? If so, what might be the cause?
-   Are there areas for improvement or refactoring in this part of the code?
    - Check if try it out functionality works in Swagger UI
-   How does this enhance your understanding of the overall project?
    - Debugging this confirms that new endpoints are properly documented before deployment.
