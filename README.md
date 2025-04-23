UGA Event Hub is a full-stack web application that allows University of Georgia (UGA) students to create, explore, and RSVP to campus and local events. Built using the Next.js App Router, Express.js, and MongoDB, the platform includes user authentication, email verification, profile management, and role-based access to event tools.

Features

User Authentication & Verification:
    - Register/login using UGA email only
    - Email verification required via secure token link
    - Session persists using localStorage

User Dashboard:

  - Account Info – view/edit personal details, upload a profile picture
  - My Events – view, edit, or delete events you’ve created
  - Joined Events – view events you’ve RSVP’d to

Event Functionality:

Create events with:
  - Title, description, date, time, location
  Image URL and capacity

Browse and filter events by:

  - Top Events
  - Newly Added
  - Coming Up
  - View full event details with host info and attendee count

RSVP System: 

  - RSVP/cancel RSVP (if authenticated)
  - Capacity lock: RSVPs close when full
  - One user = one RSVP per event

Tech Stack

  Frontend: 

  - Next.js (App Router)
  - React
  - Tailwind CSS

  Backend:

  - Express.js
  - MongoDB with Mongoose
  - Nodemailer – email verification
  - JWT – token-based session control

Installation & Setup

1. Clone the repo

    - git clone https://github.com/Mater1212/TARDIS.git
    - cd TARDIS

2. Setup the backend

    - cd backend
    - npm install
    - Create a .env file:
    MONGO_URI=your_mongodb_connection_string
    EMAIL_USER=your_email@uga.edu
    EMAIL_PASS=your_email_password
    - Run the backend: node app.js

3. Setup the frontend

    - cd frontend
    - npm install
    - npm run dev

Project Structure

/frontend
    ├── components/
    └── contexts/
    └── src/app
      ├── events/
      ├── add-event/
      ├── add-event/[id]
      ├── login/
      ├── signup/
      ├── profile/
      ├── check-email/
      ├── verify/
      ├── auth-view/
  

/backend
  ├── models/
  ├── routes/
  └── app.js
