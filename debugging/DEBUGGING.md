# Debugging Analysis

## Scenario 1: Create Branch

-   **Breakpoint Location:** branchRoutes.ts line 119
-   **Objective:** How the validation middleware intercepts the request

### Debugger Observations

-   **Variable States:** payload {"name": "Canada Branch",
    "address": "Vancouver, Canada",
    "phone": "12345678"}
-   **Call Stack:** validateRequest function, create branch controller function, 
-   **Behavior:** the payload is compared to the brnach schema before the request is passed to the controller

### Analysis

-   the validate request function is called first before passing the data to the next function
-   incorrect data threw validation errors
-   i understand why validation is important as it prevents adding wrong data to database

## Scenario 2: Delete Branch

-   **Breakpoint Location:** branchService.ts line 78
-   **Objective:** How the delete process occurs

### Debugger Observations

-   **Variable States:** id of branch 
-   **Call Stack:** validateRequest, deleteBranch service function
-   **Behavior:** the branch with the id passed is deleted from the db

### Analysis

-   it searches for branch with that id on firstore then deletes
-   wrong id throws error
-   better error message for invalid id

## Scenario 3: Update Employee

-   **Breakpoint Location:** employeeRoutes.ts
-   **Objective:** how employee data update works

### Debugger Observations

-   **Variable States:** update payload, id of employee to be updated
-   **Call Stack:** validateRequest function, updateEmployee Controller function
-   **Behavior:** employee with the passed id is found and its data is replaced with the new data

### Analysis

-   how the put request works
-   validation middleware also rejects invalid data
-   I understand why the put request also needs to be validated to preserve db integrity
