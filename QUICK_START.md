# BerryBooo - Quick Start Guide

## Testing the Application (Demo Mode)

The application is fully functional in **demo mode** without any configuration. You can test all features immediately!

### 1. Login Testing

#### Option A: Email Login (Recommended for Testing)
1. Click "Login" or try to checkout
2. Select **"Email Login"** tab
3. Enter any email address (e.g., `test@gmail.com`)
4. Click "Send OTP to Email"
5. **Check the toast notification** - it will show the 6-digit OTP
6. Enter the OTP shown in the toast
7. Click "Verify & Continue"

#### Option B: Phone Login
1. Click "Login" or try to checkout
2. Select **"Phone Login"** tab
3. Enter any 10-digit phone number (e.g., `9876543210`)
4. Click "Send OTP to Phone"
5. **Check the toast notification** - it will show the 6-digit OTP
6. Enter the OTP shown in the toast
7. Click "Verify & Continue"

### 2. Shopping & Checkout

1. **Browse Products**: Scroll through the homepage
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the navbar
4. **Proceed to Checkout**: Click the green checkout button
5. **Login**: Complete login if not already logged in
6. **Fill Address**: Enter delivery details including email
7. **Apply Coupon** (Optional):
   - `SAVE10` - 10% off
   - `SAVE20` - 20% off
   - `FLAT50` - ₹50 off
8. **Select Payment Method**: Choose any payment option
9. **Place Order**: Click "Place Order"

### 3. Email Notifications (Demo Mode)

**Current Status**: Email service is in demo mode

- ✅ OTP generation works
- ✅ Order ID generation works
- ✅ All order details are calculated correctly
- ⚠️ Actual email sending requires EmailJS configuration

**What happens in demo mode:**
- OTP is shown in toast notification (not sent to email)
- Order confirmation is shown in toast (not sent to email)
- Console logs show what would be sent
- All functionality works perfectly for testing

### 4. Features to Test

#### Cart Features
- ✅ Add products to cart
- ✅ Update quantities (+ / - buttons)
- ✅ Remove items (trash icon)
- ✅ Cart persists on page reload
- ✅ Real-time total calculation
- ✅ **Free shipping above ₹499**
- ✅ ₹50 shipping fee below ₹499

#### Login Features
- ✅ Email login with OTP
- ✅ Phone login with OTP
- ✅ Switch between email/phone
- ✅ OTP verification
- ✅ Resend OTP
- ✅ Login state persistence

#### Checkout Features
- ✅ Address form validation
- ✅ Email validation
- ✅ Coupon system
- ✅ Multiple payment methods
- ✅ Order summary
- ✅ Order ID generation
- ✅ Cart clearing after order

## Enabling Real Email Sending

To enable actual email sending, follow these steps:

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for free account
3. Verify your email

### Step 2: Configure Email Service
1. Add email service (Gmail recommended)
2. Copy **Service ID**

### Step 3: Create Email Templates

#### OTP Template
```
Subject: Your BerryBooo Login OTP

Hello,

Your One-Time Password (OTP) is: {{otp_code}}

This OTP is valid for 10 minutes.

Phone: {{phone_number}}

Best regards,
{{app_name}} Team
```

#### Order Confirmation Template
```
Subject: Order Confirmation - {{order_id}}

Dear {{customer_name}},

Thank you for your order! 🎉

Order ID: {{order_id}}

Items:
{{items_list}}

Subtotal: {{subtotal}}
Discount: {{discount}}
Total: {{total}}

Delivery Address:
{{delivery_address}}

Contact: {{phone_number}}

Best regards,
{{app_name}} Team
```

### Step 4: Update Configuration

Open `src/utils/emailService.ts` and update:

```typescript
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_abc123',        // Your service ID
  OTP_TEMPLATE_ID: 'template_otp123',  // Your OTP template ID
  ORDER_TEMPLATE_ID: 'template_order123', // Your order template ID
  PUBLIC_KEY: 'abc123XYZ',             // Your public key
};
```

### Step 5: Test Real Emails
1. Restart the dev server
2. Login with your real email
3. Check your inbox for OTP
4. Complete an order
5. Check inbox for order confirmation

## Troubleshooting

### OTP Not Showing?
- Check the **toast notification** (top-right corner)
- Check browser console for logs
- OTP is displayed in the toast in demo mode

### Email Not Received?
- Check spam/junk folder
- Verify EmailJS configuration
- Check browser console for errors
- Ensure EmailJS credentials are correct

### Cart Not Working?
- Clear browser cache
- Check localStorage is enabled
- Try in incognito mode

### Login Issues?
- Use the OTP shown in toast notification
- Try refreshing the page
- Clear browser cache

## Browser Console Logs

Open browser console (F12) to see:
- 📧 Email sending attempts
- ✅ Success messages
- ❌ Error details
- 🔑 Generated OTPs (in demo mode)
- 📦 Order IDs

## Demo Credentials

**Coupons:**
- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `FLAT50` - ₹50 flat discount

**Test Data:**
- Any email: `test@gmail.com`
- Any phone: `9876543210`
- OTP: Check toast notification

## Support

For detailed email setup instructions, see `EMAIL_SETUP.md`

## Notes

- All data is stored in browser localStorage
- No backend required for demo
- Email sending requires EmailJS setup
- Free tier: 200 emails/month
- All features work in demo mode
