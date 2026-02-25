// Email service utility for sending OTP and order confirmation emails
// This uses EmailJS for frontend email sending without a backend

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

// EmailJS configuration - User needs to set these up
const EMAIL_CONFIG = {
  SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID', // Replace with your EmailJS service ID
  OTP_TEMPLATE_ID: 'YOUR_OTP_TEMPLATE_ID', // Replace with your OTP template ID
  ORDER_TEMPLATE_ID: 'YOUR_ORDER_TEMPLATE_ID', // Replace with your order template ID
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY', // Replace with your EmailJS public key
};

// Initialize EmailJS
const initEmailJS = () => {
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    (window as any).emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
  }
};

// Send OTP email
export const sendOTPEmail = async (
  email: string,
  phoneNumber: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if EmailJS is loaded
    if (typeof window === 'undefined' || !(window as any).emailjs) {
      console.warn('EmailJS not loaded. Email sending is disabled.');
      return {
        success: false,
        message: 'Email service not configured. Please add EmailJS script to index.html',
      };
    }

    initEmailJS();

    const templateParams = {
      to_email: email,
      phone_number: phoneNumber,
      otp_code: otp,
      app_name: 'BerryBooo',
      year: new Date().getFullYear(),
    };

    await (window as any).emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.OTP_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'OTP sent successfully to your email',
    };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return {
      success: false,
      message: 'Failed to send OTP email. Please check your email configuration.',
    };
  }
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (
  email: string,
  orderDetails: {
    orderId: string;
    customerName: string;
    items: Array<{ name: string; quantity: number; price: string }>;
    subtotal: number;
    discount: number;
    total: number;
    address: string;
    phoneNumber: string;
  }
): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if EmailJS is loaded
    if (typeof window === 'undefined' || !(window as any).emailjs) {
      console.warn('EmailJS not loaded. Email sending is disabled.');
      return {
        success: false,
        message: 'Email service not configured. Please add EmailJS script to index.html',
      };
    }

    initEmailJS();

    // Format items list for email
    const itemsList = orderDetails.items
      .map(
        (item) =>
          `${item.name} - Qty: ${item.quantity} - ${item.price}`
      )
      .join('\n');

    const templateParams = {
      to_email: email,
      order_id: orderDetails.orderId,
      customer_name: orderDetails.customerName,
      items_list: itemsList,
      subtotal: `₹${orderDetails.subtotal.toLocaleString()}`,
      discount: orderDetails.discount > 0 ? `₹${orderDetails.discount.toLocaleString()}` : '₹0',
      total: `₹${orderDetails.total.toLocaleString()}`,
      delivery_address: orderDetails.address,
      phone_number: orderDetails.phoneNumber,
      app_name: 'BerryBooo',
      year: new Date().getFullYear(),
    };

    await (window as any).emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.ORDER_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Order confirmation sent to your email',
    };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return {
      success: false,
      message: 'Failed to send order confirmation email.',
    };
  }
};

// Generate random OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `BB-${timestamp}-${random}`.toUpperCase();
};
