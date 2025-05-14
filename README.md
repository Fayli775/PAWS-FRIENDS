# CS732 Group Project- 🐾 Paws' Friends – New Zealand's Pet Sitter Booking Platform

**Paws' Friends** is a full-featured web platform proudly developed by Team Pied Pipers to connect New Zealand pet owners with certified sitters. Designed with local flavor, the app helps you find trustworthy carers, manage bookings, create adorable pet profiles, and explore pet-friendly places around Auckland. We support English, 中文 Chinese, and Māori – because even your dog deserves a bilingual sitter.

Our team members are:
- Mengming Yang _(myan358@aucklanduni.ac.nz)_
- July Xu _(jxu754@aucklanduni.ac.nz)_
- Elaine Zhang _(byhz081@aucklanduni.ac.nz)_
- Zhi Yan _(zyan296@aucklanduni.ac.nz)_
- Pengfei Li _(pli775@aucklanduni.ac.nz)_
- Zhen Zeng _(zzhe577@aucklanduni.ac.nz)_
- Junlong Wang _(jwna891@aucklanduni.ac.nz)_

## 🌟 Core Features

### 👤 User Management
- Sign up with a unique username and email (with validation)
- Upload your avatar, write a bio, and select your Auckland region
- Secure login powered by JWT
- Role-based access control (sitter&owner)

### 🐾 Pet Management
- Add your pets with name, type (Dog or Cat), allergies, and special care needs
- Upload a cute photo, vet info, and emergency contact
- Pet profile management
- Pet history tracking

### 📆 Booking & Calendar
- Book sitters based on availability and pet type
- Sitters can accept or reject jobs with a click
- Built-in calendar with New Zealand holidays preloaded
- Automatic booking reminders (30-minute advance notifications)
- Booking history and status tracking
- Support for Dog Walking, In-Home Feeding, and Dog Grooming & Care services

### 📜 Certification System
- Sitters can upload certification documents
- "New Zealand Certified" badge display
- Document validation system

### 🗺️ Pet-Friendly Map
- Discover dog-friendly zones around Auckland
- Data loaded from backend, fully extensible
- Location-based sitter search
- Custom location contributions

### 🌐 Multilingual Support
- Support for English, 中文 Chinese, Te Reo Māori, Hindi, Korean, Japanese, and Spanish
- Filter sitters based on preferred communication language
- Localized user interface

### 🔍 Advanced Search
- Filter by pet type, region, service type, language, calendar
- Public sitter profiles with badges and reviews
- Comprehensive search filters

### 🌟 Review System
- Post-service reviews
- Rating system
- Complaint management
- Feedback collection

## 🧰 Tech Stack

### 🖥️ Frontend
- **Next.js 15** with App Router
- **Next-Auth 4** for auth management
- **React** with **TypeScript**
- **Material UI (MUI)** for components
- **i18n** for multilingual support
- **Next.js** deployment on Vercel

### ⚙️ Backend
- **Express.js** server
- **MySQL** database
- **JWT** authentication
- **Multer** for file uploads
- Modular architecture: `routes` ↔ `controllers` ↔ `models`

### 🚀 Deployment
- **Vercel Platform**
  - NextJS App & Backend API
  - Vercel Blob for image hosting
- **Clever Cloud** for database hosting

### 🧪 Testing

Run tests for both frontend and backend:

```bash
# Run all tests
npm run test
```

The test suite includes:
- Isolated test database with separate schema
- Unit tests for controllers and models
- Integration tests for API endpoints
- Test database cleanup after each test run

## 🗂 Project Structure

```bash
project/
├── frontend/           # Next.js frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── ...
│
├── backend/           # Express.js backend
│   ├── controllers/   # Feature logic
│   ├── models/        # DB operations
│   ├── routes/        # RESTful endpoints
│   ├── middleware/    # Auth, upload handling
│   ├── public/        # Static assets
│   ├── schedulers/    # Cron jobs
│   ├── scripts/       # DB utilities
│   ├── sql/          # Database schemas
│   ├── tests/        # Test suites
│   └── utils/        # Helper functions
```

## 🛠 Setup Instructions

1. **Clone the Repository**
Clone the repo from Github

2. **Environment Setup**

The required .env files for both the backend and frontend have been submitted separately through the private "API Key and Private Information Submission" section, as instructed. Please refer to that submission area to retrieve the environment variable contents needed to run the application.

3. **Installation**

Backend setup:
```bash
cd backend
npm install
```

Frontend setup:
```bash
cd frontend
npm install
```

4. **Running the Application**

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 🌍 Deployment

The application is currently deployed using cloud services:

### Frontend Deployment
- Platform: Vercel
- URL: [Your Vercel deployment URL]
- Automatic deployments from main branch
- Environment variables configured in Vercel dashboard

### Backend Deployment
- Platform: Railway
- URL: [Your Railway deployment URL]
- Environment variables configured in Railway dashboard
- Automatic deployments from main branch

### Database
- Platform: Clever Cloud
- Features:
  - Cloud-hosted MySQL database
  - Managed through Clever Cloud
  - No local database setup required
  - Automatic backups
  - Scalable resources

## 🔐 Environment Variables

### Production Environment
Production environment variables are configured in the respective cloud platforms:
- Backend: Railway dashboard
- Frontend: Vercel dashboard
- Database: Clever Cloud dashboard

### Local Development
For local development, use the environment variables provided in the private submission area. These are default values for development and should not be used in production.

### Environment Variable Security
- Production environment variables are not stored in the repository
- Local development variables are provided as examples
- Sensitive information is managed through cloud platform dashboards
- Database credentials are managed through Clever Cloud

## 📝 Future Enhancements

Planned features:
- Real-time messaging between sitters and owners
- Payment integration
- Enhanced document validation
- Role-based dashboards
- Custom location contributions

## 📄 License

Built for educational purposes as part of COMPSCI 732 at the University of Auckland.

## 🙌 Acknowledgments

- University of Auckland – COMPSCI 732
- NZ pet owners who inspired our features
- Open source community: Next.js, Express, MySQL, Jest, MUI, i18n
