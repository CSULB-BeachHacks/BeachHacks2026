# BeachHacks Newsletter Guide

## How to Send Newsletters to Subscribers

Since Cloud Functions require Firebase Blaze plan, here's how to manually send newsletters using SendGrid directly.

---

## Option 1: Use SendGrid Marketing Campaigns (Recommended)

### Setup (One-time)
1. Go to [SendGrid Marketing](https://mc.sendgrid.com/)
2. Create a new contact list called "BeachHacks Newsletter"
3. Go to your [Firebase Console](https://console.firebase.google.com/project/beachhacks2026/firestore) → Firestore
4. Navigate to `newsletter_subscribers` collection
5. Export or copy all subscriber emails

### Sending a Newsletter
1. In SendGrid Marketing → Contacts, upload your subscriber emails
2. Go to Email API → Marketing → Single Sends
3. Create a new Single Send:
   - **From**: chair@csulb.acm.org
   - **Subject**: 🏖️ BeachHacks 9.0 Applications Are Now Open!
   - **Design**: Use the HTML template below or create your own
4. Select your BeachHacks Newsletter contact list
5. Schedule or send immediately

---

## Option 2: Use SendGrid API with Node.js Script

### Quick Script
Create a file `send-newsletter.js`:

```javascript
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Your SendGrid API key (get from functions/.env)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// List of subscriber emails (export from Firebase Console)
const subscribers = [
  'subscriber1@example.com',
  'subscriber2@example.com',
  // ... add all subscribers here
];

async function sendNewsletter() {
  for (const email of subscribers) {
    const msg = {
      to: email,
      from: 'chair@csulb.acm.org',
      subject: '🏖️ BeachHacks 9.0 Applications Are Now Open!',
      text: `BeachHacks 9.0 applications are now open! Apply at beachhacks.com`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0891b2;">🏖️ BeachHacks 9.0</h1>
          <h2>Applications Are Now Open!</h2>
          <p>We're excited to announce that applications for BeachHacks 9.0 are officially open!</p>
          <p><strong>📅 Event Dates:</strong> March 21-22, 2026</p>
          <p><strong>📍 Location:</strong> The Pointe, CSULB</p>
          <a href="https://beachhacks.com" style="display: inline-block; background: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Apply Now</a>
        </div>
      `
    };
    
    try {
      await sgMail.send(msg);
      console.log(`Sent to: ${email}`);
    } catch (error) {
      console.error(`Failed: ${email}`, error.message);
    }
  }
}

sendNewsletter();
```

Run with: `node send-newsletter.js`

---

## Getting Subscriber Emails from Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/project/beachhacks2026/firestore)
2. Click on `newsletter_subscribers` collection
3. You'll see all subscribed emails with timestamps
4. Export or manually copy the emails for your newsletter

---

## Email Template

Use this HTML template for a BeachHacks-themed email:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; background: #0c1f3f; color: white; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #1a365d; border-radius: 16px; padding: 32px; }
    h1 { color: #22d3ee; }
    .button { display: inline-block; background: linear-gradient(135deg, #06b6d4, #22d3ee); color: #0f172a; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏖️ BeachHacks 9.0</h1>
    <h2>Applications Are Now Open!</h2>
    <p>We're thrilled to announce that applications for BeachHacks 9.0 are officially open!</p>
    <p>Join us for 24 hours of hacking, learning, and creating at California State University, Long Beach.</p>
    <p><strong>📅 March 21-22, 2026</strong></p>
    <p><strong>📍 The Pointe, CSULB</strong></p>
    <br>
    <a href="https://beachhacks.com" class="button">Apply Now →</a>
    <br><br>
    <p style="color: #94a3b8; font-size: 12px;">
      You received this email because you signed up for BeachHacks updates.<br>
      5854 Beach Drive, Long Beach, CA 90840
    </p>
  </div>
</body>
</html>
```

---

## Quick Reference

| Action | Where |
|--------|-------|
| View subscribers | Firebase Console → Firestore → newsletter_subscribers |
| Send marketing emails | SendGrid → Marketing → Single Sends |
| API key | `SG.vCVnPZ...` (in .env file) |
| Sender email | chair@csulb.acm.org |
