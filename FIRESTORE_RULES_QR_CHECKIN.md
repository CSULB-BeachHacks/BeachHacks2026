# Firestore Security Rules for QR Check-In

You need to update your Firestore security rules to allow admins to update the `studentParticipant`, `locationStatus`, and `meals` fields in the `applications` collection.

## Steps to Update Firestore Rules:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules** tab
4. Replace your current rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Only admins can write to users collection
      allow write: if isAdmin();
    }

    // Applications collection
    match /applications/{applicationId} {
      // Users can read their own application
      allow read: if request.auth != null && request.auth.uid == applicationId;
      // Users can create/update their own application
      allow create, update: if request.auth != null && 
                            request.auth.uid == applicationId &&
                            // Users can only update their own fields, not admin-only fields
                            (!('studentParticipant' in request.resource.data) || 
                             request.resource.data.studentParticipant == resource.data.studentParticipant) &&
                            (!('locationStatus' in request.resource.data) || 
                             request.resource.data.locationStatus == resource.data.locationStatus) &&
                            (!('meals' in request.resource.data) || 
                             request.resource.data.meals == resource.data.meals) &&
                            (!('checkedInAt' in request.resource.data) || 
                             request.resource.data.checkedInAt == resource.data.checkedInAt);
      // Users can delete their own application (for withdrawal)
      allow delete: if request.auth != null && request.auth.uid == applicationId;
      // Admins can read all applications
      allow read: if isAdmin();
      // Admins can update status, studentParticipant, locationStatus, meals, and checkedInAt
      allow update: if isAdmin() && 
                    (request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'studentParticipant', 'locationStatus', 'meals', 'checkedInAt', 'updatedAt']) ||
                     // Allow full update if admin is updating these specific fields
                     (request.resource.data.keys().hasAll(['status', 'studentParticipant', 'locationStatus', 'meals']) ||
                      request.resource.data.keys().hasAll(['studentParticipant', 'checkedInAt']) ||
                      request.resource.data.keys().hasAll(['locationStatus']) ||
                      request.resource.data.keys().hasAll(['meals'])));
      // Admins can delete applications
      allow delete: if isAdmin();
    }
  }
}
```

## Alternative Simpler Rules (if the above doesn't work):

If you're having issues with the complex rules above, use this simpler version that gives admins full access to update applications:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if isAdmin();
    }

    // Applications collection
    match /applications/{applicationId} {
      // Users can read their own application
      allow read: if request.auth != null && request.auth.uid == applicationId;
      // Users can create/update their own application (but not admin fields)
      allow create: if request.auth != null && request.auth.uid == applicationId;
      allow update: if request.auth != null && 
                    request.auth.uid == applicationId &&
                    // Prevent users from setting admin-only fields
                    (!('studentParticipant' in request.resource.data) || 
                     request.resource.data.studentParticipant == resource.data.studentParticipant) &&
                    (!('locationStatus' in request.resource.data) || 
                     request.resource.data.locationStatus == resource.data.locationStatus) &&
                    (!('meals' in request.resource.data) || 
                     request.resource.data.meals == resource.data.meals) &&
                    (!('checkedInAt' in request.resource.data) || 
                     request.resource.data.checkedInAt == resource.data.checkedInAt);
      // Users can delete their own application (for withdrawal)
      allow delete: if request.auth != null && request.auth.uid == applicationId;
      // Admins have full access
      allow read, write: if isAdmin();
    }
  }
}
```

## Important Notes:

1. **Publish the rules** after updating them (click "Publish" button)
2. **Test the rules** using the Rules Playground in Firebase Console
3. Make sure your admin user has the `isAdmin: true` flag set in the `users` collection
4. The rules check for admin status by looking up the user's document in the `users` collection

## Testing:

After updating the rules, try scanning a QR code again. The check-in should work if:
- The admin user is authenticated
- The admin user has `isAdmin: true` in their user document
- The rules have been published
