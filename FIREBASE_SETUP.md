# Firebase Authentication Setup Guide

This project now includes Firebase authentication with Google sign-in support. Follow these steps to complete the setup:

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider
   - Configure your OAuth consent screen if needed

## 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web (</>) icon
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 3. Environment Variables

1. Create a `.env` file in your project root (copy from `env.example`)
2. Replace the placeholder values with your actual Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 4. Google OAuth Setup (Optional)

If you want to use Google authentication:

1. In Firebase Console > Authentication > Sign-in method
2. Click on Google provider
3. Enable it and add your project's web domain to authorized domains
4. For development, add `localhost` to authorized domains

## 5. Features Included

✅ **Email/Password Authentication**

- User registration with email and password
- User login with email and password
- Password confirmation validation

✅ **Google Authentication**

- One-click Google sign-in
- Automatic account creation for Google users

✅ **User Management**

- User profile display in navbar
- Logout functionality
- Authentication state persistence

✅ **UI Components**

- Modern, responsive login/signup modals
- Beautiful gradient design matching your theme
- Error handling and loading states
- Mobile-responsive design

## 6. Usage

The authentication is now integrated into your navbar:

- **Login/Sign Up buttons** appear when user is not authenticated
- **Welcome message and Logout button** appear when user is authenticated
- **Modal forms** handle both email/password and Google authentication

## 7. Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file shows the required environment variables
- Firebase handles all security aspects of authentication
- User passwords are never stored in your app

## 8. Next Steps

You can now:

- Protect routes based on authentication status
- Store additional user data in Firestore
- Implement role-based access control
- Add password reset functionality
- Customize user profiles

## Troubleshooting

- Make sure all environment variables are correctly set
- Check Firebase Console for any configuration errors
- Verify that your domain is authorized for Google OAuth
- Check browser console for any Firebase initialization errors
