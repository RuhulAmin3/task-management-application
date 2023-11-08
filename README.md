# Starting with Task management application backend

#### Live website Link: https://task-management-frontend-6cqf.vercel.app/

#### backend Host URL: https://task-management-application-six.vercel.app/

### Feature of Task management application

- User can register / Login account after login user can see his own previous added task he can add new task with update delete functionality.
- pagination and filtering implemented in get all tasks api endpoint.

### Explanation of the using technologies.

- I am using express to making REST API.
- Prisma for declare schema and mongodb as a database with typescript for type safety.
- Zod validation for proper data validation.
- Used Redux toolkit query to make all API implementations.
- JWT token for user authentication validation.

### API documentation

#### Auth / User api

- /api/v1/auth/signup (POST) ====> user registration api endpoint.
- /api/v1/auth/signin (POST) ====> user sign api endpoint.

#### Task Api

- /api/v1/task (POST) ====> add task api endpoint.

- /api/v1/task?searchTerm=searchText&page=1&limit=10 (get) ====> get task api endpoint with search query parameter. user can search and filtering by passing query parameter.

- /api/v1/task/:id (get) ====> get single task api endpoint.

- /api/v1/task/:id (PATCH) ===> Update task api endpoint. User can update his own added task.

- /api/v1/task/:id (DELETE) ===> Delete task api endpoints. User can delete his own added task.

### Technology

- TypeScript
- Node JS
- Express JS
- Jsonwebtoken
- Mongodb
- Prisma
- Zod
