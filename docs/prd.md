# Berrybooo Plant Selling Business Website Requirements Document

## 1. Application Overview

### 1.1 Application Name
Berrybooo

### 1.2 Application Description
A modern, premium frontend website for a plant selling business, featuring grafted fruit saplings, flower plants, and indoor plants. The website is designed with a clean, minimal aesthetic inspired by kyari.co and ugaoo.com, built to be easily integrated with Supabase for future backend functionality. Enhanced with full ecommerce functionality including shopping cart system, promotional hero slider, login system with OTP verification, checkout flow, payment integration structure, and automated email notifications for OTP and order confirmation.

## 2. Core Features

### 2.1 Navigation System
- Sticky navbar with smooth scroll behavior
- Unique Berrybooo logo positioned on the left
- Menu items: Fruit Saplings, Flower Plants, Indoor Plants, Garden Essentials, About, Contact
- Cart icon with item counter badge in top-right corner
- Cart button replacing previous Shop button
- Responsive hamburger menu for mobile devices
- All navbar links with smooth scrolling to dynamically generated sections
- Fully functional mobile menu toggle

### 2.2 Hero Slider Section
- Premium homepage hero slider with 3 promotional slides
- Large banner layout with promotional plant images
- Slide content includes:
  - Big discount text (e.g., Up to 50% OFF)
  - Offer code section
  - CTA button
- Auto-sliding functionality
- Navigation arrows (previous/next)
- Dot indicators for slide position
- Smooth transition animations
- Fully responsive design

**Slider Content:**
- Slide 1: Grafted Fruit Saplings Discount
- Slide 2: Flower Plants Offer
- Slide 3: Indoor Plants Sale

### 2.3 Product Categories

**Grafted Fruit Saplings**
- Thai Chikoo
- Mango Grafted
- Guava
- Lemon
- Exotic Fruits

**Flower Plants**
- Rose
- Hibiscus
- Seasonal Flowers

**Indoor Plants**
- Snake Plant
- Areca Palm
- Money Plant
- Low Maintenance Plants

### 2.4 Category Display System
Each category section includes:
- Category title
- Category description
- Dynamically generated product grid
- Fully functional View All button that expands products inline without page reload or navigation

### 2.5 Product Card Component
Each dynamically generated product card displays:
- Product image
- Plant name
- Subtitle
- Price
- Fully functional View Details button (opens product modal)
- Fully functional Add to Cart button

### 2.6 Product Modal
- Opens when View Details button is clicked
- Displays detailed product information
- Includes Add to Cart functionality
- Close button to dismiss modal
- Overlay background

### 2.7 Shopping Cart System

**Cart Drawer:**
- Opens as right sidebar drawer
- Displays all added cart items with correct rendering
- Close button to dismiss cart

**Cart Item Features:**
- Product image display
- Product name display
- Product price display
- Quantity increase/decrease controls
- Remove item button
- Individual item subtotal calculation and display

**Cart Summary:**
- Auto-calculated subtotal for all items
- Cart item counter badge on navbar cart icon
- Empty cart state message

**Data Persistence:**
- Cart data saved in localStorage
- Cart persists after page refresh
- Cart state restored on page load
- Fixed cart rendering issue to ensure all added products display correctly

### 2.8 Login System with OTP Verification

**Login Modal:**
- Opens when user clicks Checkout button
- Mobile number and email input interface
- Mobile number input field with +91 prefix
- Email/Gmail input field
- Continue button to proceed
- Close button to dismiss modal
- Overlay background

**OTP Verification Flow:**
- User enters mobile number and email
- System sends OTP to both mobile number and email
- OTP input field appears
- User enters received OTP
- System verifies OTP
- Proceed to checkout upon successful verification

**Email Notification for Login:**
- Auto-generated email sent to provided Gmail/email address
- Email contains OTP code
- Email subject: Berrybooo Login OTP
- Email includes OTP validity period

**Login State Management:**
- Save login state in localStorage
- Persist login status across page refresh
- Allow checkout only after successful OTP verification
- Display user logged-in status

### 2.9 Checkout/Payment Page

**Page Trigger:**
- Opens after successful OTP verification
- Replaces cart drawer view
- Modern plant ecommerce checkout design

**Order Summary Section:**
- List of cart items with images, names, quantities, and prices
- Item subtotals
- Total amount calculation

**Coupon Code Section:**
- Coupon code input field
- Apply button
- Saved amount display (if coupon applied)

**Address Section:**
- Delivery address input fields
- Name, mobile number, pincode, address line, city, state
- Save address functionality

**Continue Button:**
- Proceeds to payment methods section
- Validates required fields

### 2.10 Payment Methods Section

**Payment Options UI:**
- Razorpay (primary payment gateway)
- UPI payment option
- Card payment option
- Net Banking option

**Razorpay Integration Structure:**
- Prepared structure for Razorpay integration
- Placeholder for Razorpay Key ID (to be added later)
- Payment button with Razorpay trigger logic
- Order amount pass-through to Razorpay

**Payment Flow:**
- Select payment method
- Click Pay Now button
- Trigger respective payment gateway (frontend structure only)
- Display payment confirmation UI
- Send order confirmation email after successful payment

### 2.11 Order Confirmation Email System

**Email Trigger:**
- Auto-generated email sent immediately after order placement
- Sent to the Gmail/email address provided during login

**Email Content:**
- Email subject: Order Confirmation - Berrybooo
- Order number
- Order date and time
- List of ordered items with quantities and prices
- Total amount paid
- Delivery address
- Payment method used
- Estimated delivery date
- Contact information for support

**Email Delivery:**
- Email must be sent successfully to the provided Gmail address
- Confirmation message displayed on website after email is sent

### 2.12 Website Sections
- Hero Slider Section
- Category Highlights
- Fruit Saplings Section
- Flower Plants Section
- Indoor Plants Section
- Why Choose Us Section
- Testimonials Section
- Newsletter UI
- Footer

### 2.13 Animations and Interactions
- Smooth scrolling throughout the site
- Fade-in animations on scroll
- Hover elevation effects on product cards
- Navbar scroll effect
- Hero slider smooth transitions
- Cart drawer slide-in animation
- Modal fade-in animation
- Login modal slide-in animation
- Checkout page transition animation
- Performance-optimized animations

## 3. Technical Architecture

### 3.1 Technology Stack
- Pure HTML5
- Modern CSS (Flexbox and Grid)
- Vanilla JavaScript only
- No frameworks or libraries

### 3.2 File Structure
- index.html
- styles.css
- script.js

### 3.3 Dynamic JavaScript Architecture

**Data Structure Requirements:**
- All products stored in JavaScript data objects/arrays
- Category-based data organization
- Example structure:
```javascript
const categories = [
  {
    id: \"fruit\",
    name: \"Fruit Saplings\",
    products: [...]
  }
]
```

**Required Reusable Functions:**
- createCategorySection()
- renderProducts()
- createProductCard()
- openProductModal()
- addToCart()
- updateCartUI()
- renderCartItems() - Fixed to correctly display all cart products
- calculateCartTotal()
- saveCartToLocalStorage()
- loadCartFromLocalStorage()
- initHeroSlider()
- openLoginModal()
- handleLogin()
- sendOTPEmail()
- verifyOTP()
- saveLoginState()
- checkLoginStatus()
- openCheckoutPage()
- renderOrderSummary()
- applyCoupon()
- validateAddress()
- selectPaymentMethod()
- initRazorpayStructure()
- sendOrderConfirmationEmail()

**Critical Rules:**
- No hardcoded product HTML in index.html
- HTML contains only empty container elements
- All product cards, grids, and sections generated via JavaScript
- Dynamic injection of categories, product grids, and cards
- All buttons fully functional
- All interactive elements working
- Cart rendering issue fixed
- Login with OTP verification fully functional
- Email sending functionality for OTP and order confirmation implemented

### 3.4 Supabase Integration Readiness

**Architecture Requirements:**
- Clear separation between data layer, UI rendering, and event handling
- Modular code structure allowing easy data source replacement
- Design pattern supporting: fetch products from Supabase → pass data into renderProducts()
- Avoid tightly coupled code
- Cart system compatible with future backend integration
- Login system ready for backend authentication integration
- OTP verification ready for backend SMS/email service integration
- Order and payment data structure ready for backend processing
- Email notification system ready for backend email service integration

### 3.5 Responsive Design
- Mobile-first approach
- Fully responsive across all device sizes
- No layout breaking on any screen size
- Hero slider responsive on all devices
- Cart drawer responsive behavior
- Modal responsive layout
- Login modal responsive design
- Checkout page responsive layout
- Payment methods section responsive design

## 4. Design Requirements

### 4.1 Design Style
- Premium and minimal aesthetic
- Plant-focused visual identity
- Modern ecommerce feel
- Inspired by kyari.co and ugaoo.com
- Kyari-style hero slider design
- Modern checkout page design similar to reference image

### 4.2 Logo Design
- Unique Berrybooo logo design
- Modern and distinctive visual identity
- Plant-themed elements incorporated
- Clean and memorable design
- Scalable for different screen sizes

### 4.3 Color Palette
- Soft green palette as primary color scheme

### 4.4 Visual Elements
- Rounded cards
- Smooth hover animations
- Subtle shadows
- Clean typography
- Modern slider controls
- Elegant cart drawer design
- Professional modal overlay
- Clean login modal design
- Modern checkout page layout
- Clear payment options UI

## 5. Functional Requirements

### 5.1 Included Features
- Add to Cart functionality (with fixed rendering)
- Shopping cart management
- Cart data persistence (localStorage)
- Product modal view
- Hero promotional slider
- Smooth scroll navigation
- Dynamic product expansion
- Quantity controls
- Cart subtotal calculation
- Mobile number and email login system
- OTP verification for login
- OTP email notification
- Login state persistence
- Checkout page with order summary
- Coupon code application
- Address input and validation
- Payment methods selection UI (Razorpay, UPI, Card, Net Banking)
- Razorpay integration structure
- Order confirmation email notification
- Email delivery to provided Gmail address

### 5.2 Excluded Features
The following features are NOT included:
- Backend logic
- Real OTP verification (frontend structure only)
- Real payment processing
- Server-side authentication
- Database operations
- Any server-side processing
- Cash on Delivery option (removed)

### 5.3 Interaction Behaviors
- View All: dynamically expand products using JavaScript, no page reload
- View Details: open product modal overlay
- Add to Cart: add item to cart, update counter badge, save to localStorage, render correctly in cart
- Cart icon: open cart drawer with all items displayed
- Checkout button: open login modal if not logged in
- Login: enter mobile number and email, receive OTP via email, verify OTP, save login state, proceed to checkout page
- Checkout page: display order summary, coupon input, address form
- Continue button: proceed to payment methods
- Payment selection: select payment method, trigger payment flow
- Order placement: send order confirmation email to provided Gmail address
- Slider: auto-slide with manual controls
- All CTA buttons: fully active and functional
- Single Page Application behavior

## 6. Deliverables

### 6.1 Files to Deliver
1. index.html - Complete HTML structure with empty containers, cart/modal elements, login modal with OTP fields, checkout page, payment section, and email notification structure
2. styles.css - All styling including responsive design, cart drawer, modal, slider styles, login modal, checkout page, payment UI styles, and unique Berrybooo logo styling
3. script.js - Dynamic rendering logic, fixed cart system, modal functionality, slider controls, login system with OTP verification, email sending functions for OTP and order confirmation, checkout flow, payment methods logic, and all interactions

### 6.2 Functionality Requirements
- Website must run perfectly by opening index.html locally
- Entire UI must be dynamic and future-proof for Supabase integration
- All JavaScript must be fully functional without backend dependencies
- Cart system fully operational with localStorage persistence and correct rendering
- Hero slider auto-playing with manual controls
- All buttons and interactive elements working
- Product modal functional
- Smooth scrolling active on all navigation links
- Login modal functional with OTP verification and email notification
- OTP email sent to provided Gmail address during login
- Checkout page fully functional with order summary, coupon, and address sections
- Payment methods UI complete with Razorpay structure prepared (Cash on Delivery removed)
- Order confirmation email sent automatically after order placement
- Email successfully delivered to the Gmail address provided during login
- Single-page behavior maintained throughout
- Unique Berrybooo logo displayed throughout the website

## 7. Reference Files

### 7.1 Uploaded Images
1. Screenshot 2026-02-24 172432.png