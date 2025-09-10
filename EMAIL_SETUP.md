# 📧 Email Setup Guide - Working Send Message Button

This guide will help you set up a fully functional contact form that sends real emails using EmailJS.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy your Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
To: {{to_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Copy your Template ID** (you'll need this)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key**

### Step 5: Configure Your Portfolio
1. Create a `.env` file in your project root:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

2. Replace the placeholder values with your actual EmailJS credentials
3. Restart your development server: `npm run dev`

## ✅ Testing Your Setup

1. Fill out the contact form on your portfolio
2. Click "Send Message"
3. Check your email inbox for the message
4. You should see a success message on the form

## 🔧 Troubleshooting

### "EmailJS is not configured" Error
- Make sure your `.env` file exists and has the correct variable names
- Restart your development server after adding environment variables
- Check that your credentials don't contain the placeholder values

### "Failed to send email" Error
- Verify your EmailJS service is active
- Check that your email template uses the correct variable names: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`
- Ensure your email service provider is properly connected

### Emails Not Received
- Check your spam/junk folder
- Verify the `to_email` field in your template matches your actual email
- Test with a different email address

## 🎯 Features Included

✅ **Real Email Sending** - Uses EmailJS to send actual emails  
✅ **Loading States** - Shows spinner while sending  
✅ **Success/Error Messages** - Clear feedback to users  
✅ **Form Validation** - Required fields and email format  
✅ **Error Handling** - Graceful error handling with user-friendly messages  
✅ **Auto-reset** - Form clears after successful submission  
✅ **Responsive Design** - Works on all devices  

## 🔒 Security Notes

- EmailJS public key is safe to use in frontend code
- No sensitive data is exposed
- Rate limiting is handled by EmailJS
- Free tier includes 200 emails/month

## 📱 Usage

The contact form now works exactly like before, but sends real emails:

```tsx
// The form automatically uses EmailJS when configured
<Contact />
```

**Form Fields:**
- Name (required)
- Email (required, validated)
- Message (required)

**User Experience:**
- Click "Send Message" → Loading spinner appears
- Success → Green success message + form clears
- Error → Red error message with details

## 🚀 Production Deployment

When deploying to production:

1. Add your environment variables to your hosting platform
2. For Vercel: Add them in Project Settings → Environment Variables
3. For Netlify: Add them in Site Settings → Environment Variables
4. For other platforms: Follow their environment variable setup guide

Your contact form will work exactly the same in production! 🎉
