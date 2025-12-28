# CS732 Group Project- 🐾 Paws' Friends – New Zealand's Pet Sitter Booking Platform

## Core Contributions:
- Architected and implemented complete booking management system with finite state machine 
  validation (pending → accepted → completed/cancelled), preventing race conditions through 
  database-level constraints
- Designed and built availability management API with conflict detection logic to prevent 
  overlapping time slots and double bookings at both application and database levels
- Established comprehensive testing infrastructure using Jest and Supertest, achieving 95%+ 
  backend coverage across authentication, booking, reviews, and pet management modules
- Optimized RESTful API architecture to reduce frontend roundtrips by consolidating multi-step 
  data fetching into single optimized endpoints

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
- Automatic order status updates (orders marked as "completed" 90 minutes after service end time)
- Order time status categorization based on booking time:
  - **Upcoming**: If booking time is in the future
  - **Ongoing**: If booking time is within the past 90 minutes
  - **Completed**: If booking time was more than 90 minutes ago
- **Note**: The system currently allows booking time slots for the upcoming week only, with each weekday automatically mapping to the next occurrence of that day. The system does not validate if the calculated booking time has already passed on the current day.

### 📜 Certification System
- Sitters can upload certification documents
- "New Zealand Certified" badge display
- Document validation system

### 🗺️ Pet-Friendly Map
- Discover dog-friendly zones around Auckland
- Data loaded from backend, fully extensible
- Location-based sitter search
- Custom location contributions

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

## 🧪 Testing
This project includes **backend-only tests** for core features such as user authentication, profile management, pet handling, bookings, and reviews. These tests are run using [Jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest), with an isolated MySQL test database.

---

### 🛠️ Setup for Testing

Before running the tests, make sure to configure a dedicated test database. Create a `.env.test` file at the root of your backend project and include the following variables:

```env
NODE_ENV=test 
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=paws_friends_test
```

> ⚠️ DB_PASSWORD is your actual MySQL password. Leave it blank only if there's no password.

### 🧩 First-Time Setup (Required)

Before running the tests for the first time, you need to initialize the test database structure. This step ensures that all required tables exist and match the project schema.

There are two options to ensure `NODE_ENV=test` is set correctly:

**Option 1 (Recommended): UNIX-style temporary variable**

```bash
NODE_ENV=test node scripts/initTestDB.js
```

Use this if you're on **macOS, Linux, Git Bash, WSL, or other POSIX terminals**.

**Option 2: Windows cmd.exe compatible**

```cmd
set NODE_ENV=test && node scripts/initTestDB.js
```

Use this if you're on **Windows cmd.exe** (not PowerShell or Bash).
💡 If you have already configured .env.test, Jest will usually pick up the test environment automatically.
You can usually skip setting NODE_ENV manually when running tests.

📌 You only need to run the init script once unless you later modify the schema.

### ▶️ Running the Tests

To run all tests sequentially:

```bash
npm run test -- --runInBand
```
🧠 --runInBand tells Jest to run tests sequentially in a single thread, which helps prevent issues in integration tests involving shared resources like a database connection.
This avoids race conditions and makes test logs easier to read.

> If you have configured `NODE_ENV=test` in `.env.test` and use a test runner like `jest`, it may also work via `npx jest` or a script like:
> ```json
> "scripts": {
>   "test": "jest --setupFiles ./backend/tests/setupTests.js"
> }
> ```

During the test execution:
- A mock user is registered and logged in using the setup file.
- Each test performs authenticated API calls.
- The test database is **automatically cleaned** after all tests (via `TRUNCATE` with foreign key checks disabled).

---

### 📂 Test Coverage

| File                | Description                                  |
|---------------------|----------------------------------------------|
| `setupTests.js`     | Registers a mock user and prepares auth token |
| `auth.test.js`      | Tests login and email uniqueness check        |
| `user.test.js`      | Tests profile read/update/password change     |
| `pet.test.js`       | Tests pet creation, update, deletion (with image upload) |
| `booking.test.js`   | Tests booking creation                        |
| `review.test.js`    | Tests review submission and validation        |

Each test file uses `supertest` to simulate HTTP requests against the live server (`server.js`), and assertions are performed using Jest's `expect`.

---

### 🧹 Database Cleanup

After the test suite completes, the following tables are **truncated** (emptied):

```sql
user_info, locations, pet_info, availability, booking, booking_status_log,
booking_review, booking_complain, location_reviews, notice_info, services,
service_languages, service_pet_types, sitter_services, user_certificates,
user_languages
```

This logic is implemented in `setupTests.js` and only runs if `DB_NAME` equals `paws_friends_test`.

## 📝 Future Improvements

### Booking System Enhancements

1. **Enhanced Calendar Flexibility**
   - Implement daily precision booking instead of the current weekly limitation
   - Allow users to select specific dates beyond the next week
   - Add a calendar view showing availability across multiple months
   - Add validation to prevent booking time slots that have already passed

2. **Cancellation Policy Management**
   - Implement tiered cancellation policies (e.g., free cancellation 24+ hours before, partial refund within 24 hours)
   - Add cancellation reason tracking for analytics
   - Implement automatic rebooking suggestions when cancellations occur

3. **Service Customization**
   - Allow sitters to offer customized service packages
   - Enable pet owners to specify special requirements during booking
   - Add service add-ons (e.g., extra walks, grooming, training)

### Notification System Improvements

1. **Enhanced Notice System**
   - Add timestamps to all notifications
   - Implement unread notification counters with visual indicators
   - Improve notification organization with categories

2. **Email Notifications**
   - Send booking confirmations via email
   - Implement service reminders (30 minutes before, as currently implemented in the app)
   - Send review reminders after service completion

3. **Notification Preferences**
   - Allow users to customize which notifications they receive
   - Add the ability to mute notifications temporarily

### User Experience Enhancements

1. **Performance Optimization**
   - Optimize the MyBookings page loading speed
   - Implement more efficient data fetching for reviews and booking history
   - Add skeleton loading states for better perceived performance

2. **Review System Improvements**
   - Link reviews directly to their corresponding orders
   - Add the ability to include photos in reviews
   - Implement response capability for sitters to address reviews

3. **Profile Enhancements**
   - Add more detailed service description fields
   - Implement better certificate management and display
   - Add availability templates for quick calendar setup

### Region-Based Features

1. **Enhanced Region Selection**
   - Implement more granular region selection (neighborhoods within Auckland regions)
   - Add region-based pricing options for sitters
   - Create region-specific service statistics and popularity metrics

2. **Pet-Friendly Location Database**
   - Expand the database of pet-friendly locations categorized by region
   - Allow users to filter locations by amenities and pet requirements
   - Implement user-submitted location suggestions with admin approval

### Communication Features

1. **Pre-booking Q&A**
   - Implement a structured Q&A system for potential customers to ask questions before booking
   - Add FAQ templates for sitters to save time answering common questions
   - Create a public Q&A section on sitter profiles

2. **Post-service Communication**
   - Allow limited-time communication after service completion
   - Implement templated follow-up messages for sitters

### Payment System Integration

1. **Secure Payment Processing**
   - Integrate with payment gateways like Stripe or PayPal
   - Implement secure payment holding until service completion
   - Add support for multiple payment methods

2. **Pricing Management**
   - Allow sitters to set custom rates for different services
   - Implement holiday and weekend rate adjustments
   - Add loyalty discounts for repeat customers

### Certificate Verification Improvements

1. **Streamlined Verification Process**
   - Improve the certificate upload and verification workflow
   - Add automatic verification status updates
   - Implement expiration tracking and renewal reminders for certificates

2. **Badge Display Enhancement**
   - Create a more prominent display of verification badges
   - Add tooltips explaining verification requirements
   - Implement verification level indicators (basic, standard, premium)

### Administrative Features

1. **Enhanced Admin Dashboard**
   - Create comprehensive reporting and analytics
   - Implement better user management tools
   - Add certificate verification workflows

2. **Content Management**
   - Develop a system for managing the events carousel and emergency service information
   - Add tools for updating region information and pet-friendly locations

### Technical Improvements

1. **API Optimization**
   - Improve API response times for critical endpoints
   - Add better caching strategies for frequently accessed data
   - Optimize database queries for the booking system

2. **Testing and Quality Assurance**
   - Expand test coverage for critical application paths
   - Implement end-to-end testing for core user flows
   - Add automated performance testing

3. **Internationalization**
   - Improve multi-language support with better translation management
   - Add language-specific content for the most common languages in NZ

## 📄 License

Built for educational purposes as part of COMPSCI 732 at the University of Auckland.

## 🙌 Acknowledgments

- University of Auckland – COMPSCI 732
- NZ pet owners who inspired our features
- Open source community: Next.js, Express, MySQL, Jest, MUI, i18n
