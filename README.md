A2SV Authentication Task
Project Overview

This project implements user authentication using Next.js, NextAuth, and Axios.
It includes:

User Signup with email/password and Google OAuth

OTP verification for email confirmation

User Signin using credentials 

Client-side validation and clean UI

Base API URL: https://akil-backend.onrender.com

Features

Signup Page

Users can create accounts via email/password or Google OAuth

Client-side validation for all fields

Redirects to OTP verification after successful signup

Signin Page

Users can login with email/password or Google OAuth

Handles authentication errors gracefully

Stores session securely with NextAuth

OTP Verification Page

Users verify their email using a 4-digit OTP

Countdown timer and resend OTP functionality

Redirects to Signin after successful verification

Security

Passwords are never stored in local storage

Tokens handled securely with NextAuth session

Technologies Used

=> Next.js (App Router)

=> React 18

=> NextAuth.js for authentication

=> Axios for API requests

=> Tailwind CSS for styling

=> React Hook Form for form handling and validation

Installation & Setup

Clone the repository:

git clone https://github.com/shuzeyfa/A2sv-Authentication-Task.git
cd A2sv-Authentication-Task


Install dependencies:

npm install


Set up environment variables:

Create .env.local in the root directory:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


Run the development server:

npm run dev


Open http://localhost:3000 in your browser.

Usage
Signup Flow

Navigate to /signup

Fill in the form (Name, Email, Password, Confirm Password)

Submit → redirected to OTP page

Enter OTP → redirected to Signin page

Signin Flow

Navigate to /signin

Enter email/password

Submit → redirected to /dashboard if successful

Google OAuth

Both Signup and Signin pages support Google login.

Project Structure
/app
 ├─ /signup     # Signup page component
 ├─ /signin     # Signin page component
 ├─ /otp        # OTP verification component
 ├─ /dashboard  # Protected page (after login)
 └─ /api        # NextAuth API route
