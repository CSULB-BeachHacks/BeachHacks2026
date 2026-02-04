# Firebase Cloud Function Setup for BeachHacks Newsletter

## Quick Setup Guide

### 1. SendGrid Account Setup
1. Go to [sendgrid.com](https://sendgrid.com) and create a free account
2. **Verify your sender email** (e.g., newsletter@beachhacks.com)
   - Go to: Settings → Sender Authentication → Single Sender Verification
   - Add and verify the email address you'll send from
3. Create an API key: Settings → API Keys → Create API Key (Full Access)
4. Copy the API key (you'll only see it once!)

### 2. Configure the .env File

Create or edit `functions/.env` with your SendGrid credentials:

```bash
# functions/.env
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_SENDER_EMAIL=your_verified_email@example.com
```

> ⚠️ **Important**: The sender email MUST be verified in SendGrid before you can send emails!

### 3. Install Dependencies

```bash
cd functions
npm install
```

### 4. Customize the Newsletter Email

Before deploying, edit `functions/index.js` to customize the email content:
- Line ~68: Email subject
- Line ~70-90: Plain text version  
- Line ~92-148: HTML version (styled to match BeachHacks theme)

### 5. Deploy the Function

```bash
firebase deploy --only functions
```

### 6. Test the Function (Optional)

```bash
# Test in Firebase shell
firebase functions:shell
> sendApplicationOpeningNewsletter()

# Or trigger manually from Firebase Console → Functions
```

---

## Schedule

The function is scheduled to run automatically on **February 10th, 2026 at 9:00 AM PST**.

---

## Firestore Collections Used

| Collection | Purpose |
|------------|---------|
| `newsletter_subscribers` | Stores email signups from the website |
| `newsletter_logs` | Logs each newsletter send with success/fail counts |

---

## Troubleshooting

**"SendGrid API key not configured"**
- Make sure `functions/.env` exists with `SENDGRID_API_KEY` set

**Emails not being received**
- Check if sender email is verified in SendGrid
- Check SendGrid dashboard for delivery status
- Look at Firebase Functions logs: `firebase functions:log`

**Function not deploying**
- Make sure you're logged in: `firebase login`
- Check you have the right project: `firebase use beachhacks2026`
