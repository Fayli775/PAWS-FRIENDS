# CS732 Group Project- 🐾 Paws' Friends – New Zealand's Pet Sitter Booking Platform

**Paws' Friends** is a full-featured web platform proudly developed by Team Pied Pipers to connect New Zealand pet owners with certified sitters. Designed with local flavor, the app helps you find trustworthy carers, manage bookings, create adorable pet profiles, and explore pet-friendly places around Auckland. We support English, 中文 Chinese, and Māori – because even your dog deserves a bilingual sitter.

**Live Demo:**  **https://group-project-pied-pipers-i8dx.vercel.app**

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
- **Material UI (MUI)** for styled components
- **Leaflet** for map view
- **i18n** for multilingual support

### ⚙️ Backend
- **Express.js** server
- **MySQL** database
- **JWT** authentication
- **Multer** for file uploads
- **node-cron** for scheduling jobs
- **Modular architecture:** `routes` ↔ `middlewares` ↔ `controllers` ↔ `models`

### 🚀 Live Deployment
- **Vercel Platform**
  - NextJS App & Backend API
  - Vercel Blob for files hosting
- **Clever Cloud** for database hosting
- Private keys are submitted in "Assignment - Private info / API key / etc submission"

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

**Clone the Repository from Github**


**DB Setup**

  - Install MySql and set up the local user if you haven't done so. Update DB keys in `backend/.env` for signing in your local DB.
  - Execute `backend\sql\db_backup.sql`
  - Edit `frontend\const.ts` as follows

      ```
      export const imageBaseUrl = process.env.NODE_ENV !== 'production' ? '' : "`${process.env.NEXT_PUBLIC_API_URL}`;

**Installation**

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

**Running the Application**

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
