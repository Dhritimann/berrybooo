# BerryBooo - Premium Plant Ecommerce Platform

A modern, feature-rich plant ecommerce website built with React, TypeScript, and Tailwind CSS.

## Features

- 🛒 **Shopping Cart** - Add products, manage quantities, persistent storage
- 🔐 **Email-based Login** - OTP verification sent to email
- 📧 **Email Notifications** - Automated emails for OTP and order confirmations
- 💳 **Multiple Payment Options** - Razorpay, UPI, Cards, Net Banking
- 🎟️ **Coupon System** - Apply discount codes at checkout
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎨 **Modern UI** - Clean, minimal design with smooth animations

## Email Configuration Setup

This application uses **EmailJS** to send emails directly from the frontend. Follow these steps to configure email sending:

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### OTP Template

1. Go to **Email Templates** → **Create New Template**
2. Template Name: `OTP Verification`
3. Template Content:
```html
Subject: Your BerryBooo Login OTP

Hello,

Your One-Time Password (OTP) for logging into BerryBooo is:

{{otp_code}}

This OTP is valid for 10 minutes.

Phone Number: {{phone_number}}

If you didn't request this OTP, please ignore this email.

Best regards,
{{app_name}} Team

© {{year}} BerryBooo. All rights reserved.
```
4. Save and copy the **Template ID** (e.g., `template_otp123`)

#### Order Confirmation Template

1. Create another template
2. Template Name: `Order Confirmation`
3. Template Content:
```html
Subject: Order Confirmation - {{order_id}}

Dear {{customer_name}},

Thank you for your order at BerryBooo! 🎉

Order Details:
Order ID: {{order_id}}

Items Ordered:
{{items_list}}

Subtotal: {{subtotal}}
Discount: {{discount}}
Total Amount: {{total}}

Delivery Address:
{{delivery_address}}

Contact Number: {{phone_number}}

Your order will be delivered within 5-7 business days.

Thank you for shopping with us!

Best regards,
{{app_name}} Team

© {{year}} BerryBooo. All rights reserved.
```
4. Save and copy the **Template ID** (e.g., `template_order123`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abc123XYZ`)

### Step 5: Update Configuration

Open `src/utils/emailService.ts` and update the configuration:

```typescript
const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id_here',        // From Step 2
  OTP_TEMPLATE_ID: 'your_otp_template_id',   // From Step 3
  ORDER_TEMPLATE_ID: 'your_order_template_id', // From Step 3
  PUBLIC_KEY: 'your_public_key_here',        // From Step 4
};
```

### Step 6: Test Email Sending

1. Run the application: `npm run dev`
2. Try logging in with your email
3. Check your inbox for the OTP email
4. Complete a test order and verify order confirmation email

## Important Notes

### Email Sending Limitations

- **Free Tier**: EmailJS free plan allows 200 emails/month
- **Rate Limiting**: Maximum 2 emails per second
- **Email Delivery**: Emails may take 1-2 minutes to arrive
- **Spam Folder**: Check spam/junk folder if email doesn't arrive

### Testing Tips

1. **Use Real Email**: Always test with a real email address you can access
2. **Check Spam**: First-time emails often go to spam
3. **Whitelist**: Add noreply@emailjs.com to your contacts
4. **Console Logs**: Check browser console for error messages

### Production Considerations

For production use, consider:
- Upgrading EmailJS plan for higher limits
- Implementing backend email service (Supabase Edge Functions)
- Adding email queue for reliability
- Implementing retry logic for failed emails

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **EmailJS** - Email sending
- **Vite** - Build tool
- **Lucide React** - Icons

## Features Breakdown

### Authentication
- Email + Phone number login
- OTP verification via email
- Google login option (UI ready)
- Persistent login state

### Shopping Experience
- Product browsing with categories
- Add to cart functionality
- Cart management (add/remove/update quantities)
- Real-time cart total calculations
- Persistent cart (localStorage)

### Checkout Process
1. User adds products to cart
2. Clicks "Proceed to Checkout"
3. Login required (email OTP verification)
4. Fill delivery address and email
5. Apply coupon codes (optional)
6. Select payment method
7. Place order
8. Receive order confirmation email

### Payment Methods
- Razorpay (primary)
- UPI (PhonePe, Google Pay, Paytm)
- Credit/Debit Cards
- Net Banking
- ~~Cash on Delivery~~ (Removed as requested)

## Supabase Integration Ready

The codebase is structured to easily integrate with Supabase:
- Context-based state management
- Modular API structure
- Type-safe data models
- Ready for backend migration

## Support

For issues or questions:
1. Check EmailJS dashboard for email sending status
2. Review browser console for error messages
3. Verify email configuration in `emailService.ts`
4. Test with different email providers

## License

© 2026 BerryBooo. All rights reserved.
