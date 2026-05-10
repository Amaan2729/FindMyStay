# Email Setup Guide for FindMyStay

This guide will help you set up email functionality using Nodemailer for booking confirmations, admin notifications, and user communications.

## Features

- ✅ **Booking Confirmations**: Automatic email sent to customers after successful booking
- ✅ **Admin Notifications**: Email alerts sent to admins for new bookings
- ✅ **Welcome Emails**: Welcome message sent to new users upon registration
- ✅ **Password Reset**: Framework ready for password reset emails (can be extended)

## Prerequisites

1. **Gmail Account**: You'll need a Gmail account to send emails
2. **App Password**: Generate an app password for secure access

## Gmail Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to Google Account settings
2. Navigate to Security → 2-Step Verification → App passwords
3. Select "Mail" and "Other (custom name)"
4. Enter "FindMyStay" as the custom name
5. Copy the generated 16-character password

### Step 3: Configure Environment Variables

Copy the email configuration to your `.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@yourdomain.com
FRONTEND_URL=http://localhost:5173
```

**Important**: Replace the values with your actual credentials:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The 16-character app password (not your regular password)
- `ADMIN_EMAIL`: Email address where admin notifications should be sent

## Testing Email Functionality

### 1. Start the Backend Server
```bash
cd backend
npm start
```

### 2. Test Booking Email
1. Make a booking through your frontend
2. Check the customer's email for booking confirmation
3. Check the admin email for booking notification

### 3. Test Welcome Email
1. Register a new user through your frontend
2. Check the new user's email for welcome message

## Email Templates

The system includes professionally designed HTML email templates:

- **Booking Confirmation**: Includes booking details, hotel info, and check-in instructions
- **Admin Notification**: Alerts admins of new bookings with full details
- **Welcome Email**: Welcomes new users with getting started information
- **Password Reset**: Ready-to-use template for password reset functionality

## Troubleshooting

### Common Issues

**1. "Authentication failed" error**
- Make sure you're using the app password, not your regular Gmail password
- Verify 2FA is enabled on your Google account

**2. Emails not being sent**
- Check your `.env` file for correct EMAIL_USER and EMAIL_PASS
- Ensure the Gmail account has 2FA enabled
- Check server logs for detailed error messages

**3. Emails going to spam**
- This is normal for development. In production, consider using services like SendGrid or AWS SES

### Email Service Logs

The backend will log email sending status:
```
Booking confirmation email sent: [message-id]
Admin notification email sent: [message-id]
Welcome email sent: [message-id]
```

If emails fail to send, you'll see warnings in the console but the main functionality (booking) will still work.

## Production Considerations

For production deployment, consider using dedicated email services:

- **SendGrid**: Professional email delivery service
- **AWS SES**: Amazon's Simple Email Service
- **Mailgun**: Email automation service
- **Postmark**: Transactional email service

These services provide better deliverability, analytics, and are more reliable than Gmail SMTP for high-volume sending.

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of regular passwords
- Consider using environment-specific email accounts (dev, staging, prod)
- Monitor email sending limits (Gmail has daily limits)

## Support

If you encounter issues:
1. Check the server console logs for detailed error messages
2. Verify your `.env` configuration
3. Test with a simple email sending script first
4. Ensure your Gmail account settings are correct