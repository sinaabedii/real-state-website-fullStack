# Real Estate Backend API

A comprehensive NestJS backend for a real estate platform with advanced features including property management, search, analytics, and user management.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Property Management**: CRUD operations with image upload and PostGIS location support
- **Advanced Search**: Full-text search with filters and location-based queries
- **Analytics**: Market analysis, property reports, and investment calculations
- **User Management**: User profiles, preferences, and agent management
- **Messaging System**: Real-time messaging between users and agents
- **Favorites**: Property bookmarking and management
- **Notifications**: System notifications for property updates and messages
- **Tools**: Mortgage calculator, property comparison, and report generation
- **Media Upload**: File upload with validation and storage management

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with PostGIS for location data
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **File Upload**: Multer
- **Validation**: Class-validator

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your database and other settings in `.env`

5. Run database migrations:
```bash
npm run migration:run
```

6. Start the development server:
```bash
npm run start:dev
```

## API Documentation

Once the server is running, visit `http://localhost:3001/api/docs` for interactive Swagger documentation.

## Environment Variables

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=real_estate_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# App
PORT=3001
NODE_ENV=development

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DEST=./uploads
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/refresh` - Refresh access token

### Properties
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/recent` - Get recent properties
- `GET /api/properties/nearby` - Get nearby properties
- `GET /api/properties/:id/similar` - Get similar properties

### Search
- `POST /api/search` - Advanced property search
- `GET /api/search/suggestions` - Get search suggestions
- `GET /api/search/locations` - Get available locations
- `GET /api/search/amenities` - Get available amenities

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `PUT /api/users/:id/preferences` - Update user preferences

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get agent by ID
- `POST /api/agents` - Create agent profile
- `PUT /api/agents/:id` - Update agent profile
- `GET /api/agents/verified` - Get verified agents
- `GET /api/agents/top-rated` - Get top rated agents

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:propertyId` - Remove from favorites

### Messages
- `GET /api/messages` - Get user conversations
- `POST /api/messages` - Send message
- `GET /api/messages/conversation/:partnerId` - Get conversation messages
- `PUT /api/messages/:id/read` - Mark message as read
- `GET /api/messages/unread/count` - Get unread count

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Analytics
- `GET /api/analytics/market` - Get market analytics
- `GET /api/analytics/property/:id` - Get property report
- `GET /api/analytics/investment/:id` - Get investment analysis

### Tools
- `POST /api/tools/mortgage` - Calculate mortgage
- `POST /api/tools/comparison` - Compare properties
- `GET /api/tools/report/:id` - Generate property report

### Media
- `POST /api/media/upload` - Upload single file
- `POST /api/media/upload/multiple` - Upload multiple files
- `DELETE /api/media/:filename` - Delete file

## Database Schema

### Main Entities
- **User**: User accounts with roles and preferences
- **Property**: Property listings with location data
- **Agent**: Real estate agent profiles
- **Favorite**: User's favorite properties
- **Message**: Messaging system
- **Notification**: System notifications
- **PropertyImage**: Property images
- **PropertyView**: Property view tracking

### PostGIS Integration
The system uses PostGIS for location-based queries:
- Nearby property search
- Distance calculations
- Spatial indexing for performance

## Development

### Running Tests
```bash
npm run test
npm run test:e2e
npm run test:cov
```

### Building for Production
```bash
npm run build
npm run start:prod
```

### Database Migrations
```bash
npm run migration:generate -- -n MigrationName
npm run migration:run
npm run migration:revert
```

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- File upload validation

## Performance Optimizations

- Database indexing for frequently queried fields
- Spatial indexing for location queries
- Pagination for large datasets
- Caching strategies (Redis ready)
- Query optimization with TypeORM

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
