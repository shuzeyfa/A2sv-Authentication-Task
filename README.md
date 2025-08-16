🚀 A2SV Authentication Task

A Next.js authentication project with NextAuth, email/password & Google OAuth, and OTP verification.

🌟 Features

✅ Signup via Email/Password or Google OAuth

✅ Signin using Credentials or Google OAuth

✅ OTP Verification for email confirmation

✅ Client-side validation for better UX

✅ Clean and responsive Tailwind UI

📦 Tech Stack
Technology	Purpose
Next.js 13	Frontend framework with App Router
React 18	UI library
NextAuth.js	Authentication & session management
Axios	HTTP requests to backend
Tailwind CSS	Styling & responsive design
React Hook Form	Form handling and validation

🎨 Screenshots
     - in the SCREENSHOT folder

⚡ Installation

Clone the repo:

git clone https://github.com/shuzeyfa/A2sv-Authentication-Task.git
cd A2sv-Authentication-Task


Install dependencies:

npm install


Set environment variables (.env.local):

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


Run the app:

npm run dev


Open http://localhost:3000 in your browser.

📝 Usage
Signup Flow

Go to /signup

Enter Name, Email, Password, Confirm Password

Submit → redirected to OTP page

Enter OTP → redirected to /signin

Signin Flow

Go to /signin

Enter Email & Password

Submit → redirected to /dashboard

Google OAuth

Signup and Signin both support Google login.

⏱ OTP Resend

Countdown timer before resending OTP

Resend button becomes active after timer

📂 Project Structure
/app
 ├─ /signup      # Signup page component
 ├─ /signin      # Signin page component
 ├─ /otp         # OTP verification page
 ├─ /dashboard   # Protected page after login
 └─ /api         # NextAuth API route
