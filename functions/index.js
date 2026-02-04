/**
 * BeachHacks 9.0 Newsletter Cloud Function
 * 
 * This function sends a newsletter to all subscribers when applications open.
 * Scheduled for February 10th, 2026 at 9:00 AM PST.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a SendGrid account at sendgrid.com (free tier: 100 emails/day)
 * 2. Verify your sender email address in SendGrid
 * 3. Create an API key in SendGrid (Settings → API Keys → Create API Key)
 * 4. Add the API key to functions/.env file:
 *    SENDGRID_API_KEY=your_sendgrid_api_key
 *    SENDGRID_SENDER_EMAIL=newsletter@beachhacks.com
 * 5. Deploy the function:
 *    cd functions && npm install && firebase deploy --only functions
 * 
 * TO TEST MANUALLY:
 * You can trigger this function manually from Firebase Console or using:
 * firebase functions:shell
 * > sendApplicationOpeningNewsletter()
 */

// Load environment variables from .env file
require('dotenv').config();

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

const db = admin.firestore();

/**
 * Scheduled function to send newsletter when applications open.
 * Runs on February 10th, 2026 at 9:00 AM PST (17:00 UTC)
 */
exports.sendApplicationOpeningNewsletter = functions.pubsub
    .schedule("0 17 10 2 *") // Cron: At 17:00 UTC on Feb 10th (9:00 AM PST)
    .timeZone("America/Los_Angeles")
    .onRun(async (context) => {
        console.log("Starting newsletter send for application opening...");

        // Get SendGrid config from environment variables
        const sendgridKey = process.env.SENDGRID_API_KEY;
        const senderEmail = process.env.SENDGRID_SENDER_EMAIL || "newsletter@beachhacks.com";

        if (!sendgridKey) {
            console.error("SendGrid API key not configured. Add SENDGRID_API_KEY to functions/.env file");
            return null;
        }

        sgMail.setApiKey(sendgridKey);

        try {
            // Fetch all subscribers
            const subscribersSnapshot = await db.collection("newsletter_subscribers").get();

            if (subscribersSnapshot.empty) {
                console.log("No subscribers found.");
                return null;
            }

            const subscribers = subscribersSnapshot.docs.map(doc => doc.data().email);
            console.log(`Found ${subscribers.length} subscribers`);

            // Email content - CUSTOMIZE THIS BEFORE DEPLOYING
            const emailContent = {
                subject: "🎉 BeachHacks 9.0 Applications Are NOW OPEN!",
                text: `
BeachHacks 9.0 Applications Are NOW OPEN!

Hey there, future hacker! 🌊

The wait is over! Applications for BeachHacks 9.0 are officially open!

📅 Event Dates: March 21-22, 2026
📍 Location: California State University, Long Beach

BeachHacks is CSULB's premier 24-hour hackathon where you'll have the chance to:
• Build innovative projects with like-minded hackers
• Learn from industry speakers and mentors
• Win amazing prizes
• Connect with sponsors and recruiters
• Enjoy free food, swag, and fun activities!

Don't miss out on this incredible opportunity!

👉 Apply Now: https://beachhacks.com/apply

Applications are open on a rolling basis, so apply early!

See you at BeachHacks 9.0! 🏖️

- The BeachHacks Team
                `,
                html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a1628; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 28px; font-weight: bold; color: #00ffff; margin-bottom: 10px; }
        .subtitle { font-size: 18px; color: #69dbd9; }
        .content { background: linear-gradient(135deg, rgba(105, 219, 217, 0.1) 0%, rgba(0, 186, 183, 0.1) 100%); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .highlight { color: #00ffff; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #69dbd9 0%, #00bab7 100%); color: #0b3e45 !important; font-weight: bold; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 18px; margin: 20px 0; }
        .footer { text-align: center; color: #69dbd9; font-size: 14px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="title">🎉 BeachHacks 9.0</div>
            <div class="subtitle">Applications Are NOW OPEN!</div>
        </div>
        
        <div class="content">
            <p>Hey there, future hacker! 🌊</p>
            
            <p><strong>The wait is over!</strong> Applications for BeachHacks 9.0 are officially open!</p>
            
            <p>
                <span class="highlight">📅 Event Dates:</span> March 21-22, 2026<br>
                <span class="highlight">📍 Location:</span> California State University, Long Beach
            </p>
            
            <p>BeachHacks is CSULB's premier 24-hour hackathon where you'll have the chance to:</p>
            <ul>
                <li>Build innovative projects with like-minded hackers</li>
                <li>Learn from industry speakers and mentors</li>
                <li>Win amazing prizes</li>
                <li>Connect with sponsors and recruiters</li>
                <li>Enjoy free food, swag, and fun activities!</li>
            </ul>
            
            <p><strong>Don't miss out on this incredible opportunity!</strong></p>
            
            <center>
                <a href="https://beachhacks.com/apply" class="cta-button">Apply Now →</a>
            </center>
            
            <p style="font-size: 14px; color: #c8e4ff;">Applications are open on a rolling basis, so apply early!</p>
        </div>
        
        <div class="footer">
            <p>See you at BeachHacks 9.0! 🏖️</p>
            <p>- The BeachHacks Team</p>
        </div>
    </div>
</body>
</html>
                `
            };

            // Send emails in batches to avoid rate limits
            const batchSize = 50;
            let successCount = 0;
            let failCount = 0;

            for (let i = 0; i < subscribers.length; i += batchSize) {
                const batch = subscribers.slice(i, i + batchSize);

                const messages = batch.map(email => ({
                    to: email,
                    from: senderEmail,
                    subject: emailContent.subject,
                    text: emailContent.text,
                    html: emailContent.html
                }));

                try {
                    await sgMail.send(messages);
                    successCount += batch.length;
                    console.log(`Sent batch ${Math.floor(i / batchSize) + 1}: ${batch.length} emails`);
                } catch (error) {
                    console.error(`Error sending batch: ${error.message}`);
                    failCount += batch.length;
                }

                // Small delay between batches
                if (i + batchSize < subscribers.length) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            console.log(`Newsletter send complete. Success: ${successCount}, Failed: ${failCount}`);

            // Log the send event
            await db.collection("newsletter_logs").add({
                sentAt: admin.firestore.FieldValue.serverTimestamp(),
                totalSubscribers: subscribers.length,
                successCount,
                failCount,
                type: "application_opening"
            });

            return null;

        } catch (error) {
            console.error("Error sending newsletter:", error);
            throw error;
        }
    });

/**
 * HTTP callable function to manually trigger the newsletter.
 * Useful for testing or sending on-demand newsletters.
 * 
 * IMPORTANT: This should only be callable by admins.
 */
exports.sendManualNewsletter = functions.https.onCall(async (data, context) => {
    // Check if user is authenticated and is admin
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Must be logged in.");
    }

    // Check admin status in Firestore
    const userDoc = await db.collection("users").doc(context.auth.uid).get();
    if (!userDoc.exists || !userDoc.data().isAdmin) {
        throw new functions.https.HttpsError("permission-denied", "Must be an admin.");
    }

    // Trigger the newsletter function logic here...
    // For now, just return success - the actual implementation would be similar to above
    return { success: true, message: "Newsletter would be sent here" };
});
