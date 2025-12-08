import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderEmailData {
  reference: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  totalAmount: number;
  shippingCost: number;
}

const MERCHANT_EMAIL = process.env.MERCHANT_EMAIL || 'contact@cerisesdhiver.fr';
const FROM_EMAIL = process.env.FROM_EMAIL || 'commandes@cerisesdhiver.fr';

export async function sendCustomerConfirmationEmail(orderData: OrderEmailData) {
  const { reference, items, customerInfo, totalAmount, shippingCost } = orderData;
  const subtotal = totalAmount - shippingCost;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #E91E63; margin: 0;">Éditions Cerises d'Hiver</h1>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Merci pour votre commande !</h2>
        <p>Bonjour ${customerInfo.firstName},</p>
        <p>Nous avons bien reçu votre commande et votre paiement a été confirmé.</p>
        <p><strong>Référence de commande :</strong> ${reference}</p>
      </div>

      <h3 style="color: #333;">Récapitulatif de votre commande</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f8f9fa;">
            <th style="padding: 12px; text-align: left;">Article</th>
            <th style="padding: 12px; text-align: center;">Qté</th>
            <th style="padding: 12px; text-align: right;">Prix</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 12px; text-align: right;">Sous-total :</td>
            <td style="padding: 12px; text-align: right;">€${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 12px; text-align: right;">Livraison :</td>
            <td style="padding: 12px; text-align: right;">${shippingCost === 0 ? 'Gratuit' : `€${shippingCost.toFixed(2)}`}</td>
          </tr>
          <tr style="font-weight: bold; font-size: 1.1em;">
            <td colspan="2" style="padding: 12px; text-align: right; border-top: 2px solid #333;">Total :</td>
            <td style="padding: 12px; text-align: right; border-top: 2px solid #333; color: #E91E63;">€${totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <h3 style="color: #333;">Adresse de livraison</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0;">
          ${customerInfo.firstName} ${customerInfo.lastName}<br>
          ${customerInfo.address}<br>
          ${customerInfo.postalCode} ${customerInfo.city}<br>
          ${customerInfo.country}
          ${customerInfo.phone ? `<br>Tél: ${customerInfo.phone}` : ''}
        </p>
      </div>

      <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0;"><strong>📦 Expédition :</strong> Votre commande sera expédiée sous 2-3 jours ouvrés. Vous recevrez un email avec le numéro de suivi dès l'expédition.</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 0.9em;">
        <p>Des questions ? Contactez-nous à <a href="mailto:${MERCHANT_EMAIL}" style="color: #E91E63;">${MERCHANT_EMAIL}</a></p>
        <p>Éditions Cerises d'Hiver</p>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `Éditions Cerises d'Hiver <${FROM_EMAIL}>`,
      to: customerInfo.email,
      subject: `Confirmation de commande ${reference} - Éditions Cerises d'Hiver`,
      html,
    });

    if (error) {
      console.error('Error sending customer email:', error);
      return { success: false, error };
    }

    console.log('Customer confirmation email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending customer email:', error);
    return { success: false, error };
  }
}

export async function sendMerchantNotificationEmail(orderData: OrderEmailData) {
  const { reference, items, customerInfo, totalAmount, shippingCost } = orderData;
  const subtotal = totalAmount - shippingCost;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">€${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🎉 Nouvelle commande !</h1>
        <p style="margin: 10px 0 0 0; font-size: 1.2em;">Référence : ${reference}</p>
      </div>
      
      <div style="border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #333; margin-top: 0;">Informations client</h2>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="padding: 5px 0;"><strong>Nom :</strong></td>
            <td>${customerInfo.firstName} ${customerInfo.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Email :</strong></td>
            <td><a href="mailto:${customerInfo.email}">${customerInfo.email}</a></td>
          </tr>
          ${customerInfo.phone ? `
          <tr>
            <td style="padding: 5px 0;"><strong>Téléphone :</strong></td>
            <td>${customerInfo.phone}</td>
          </tr>
          ` : ''}
        </table>

        <h2 style="color: #333;">Adresse de livraison</h2>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
          ${customerInfo.firstName} ${customerInfo.lastName}<br>
          ${customerInfo.address}<br>
          ${customerInfo.postalCode} ${customerInfo.city}<br>
          ${customerInfo.country}
        </div>

        <h2 style="color: #333;">Articles commandés</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Article</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Qté</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Prix unit.</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: #f5f5f5; padding: 15px; border-radius: 4px;">
          <table style="width: 100%;">
            <tr>
              <td><strong>Sous-total :</strong></td>
              <td style="text-align: right;">€${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Frais de livraison :</strong></td>
              <td style="text-align: right;">${shippingCost === 0 ? 'Gratuit' : `€${shippingCost.toFixed(2)}`}</td>
            </tr>
            <tr style="font-size: 1.2em; color: #4CAF50;">
              <td><strong>TOTAL :</strong></td>
              <td style="text-align: right;"><strong>€${totalAmount.toFixed(2)}</strong></td>
            </tr>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `Commandes ECH <${FROM_EMAIL}>`,
      to: MERCHANT_EMAIL,
      subject: `🛒 Nouvelle commande ${reference} - €${totalAmount.toFixed(2)}`,
      html,
    });

    if (error) {
      console.error('Error sending merchant email:', error);
      return { success: false, error };
    }

    console.log('Merchant notification email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending merchant email:', error);
    return { success: false, error };
  }
}

export async function sendOrderEmails(orderData: OrderEmailData) {
  const [customerResult, merchantResult] = await Promise.all([
    sendCustomerConfirmationEmail(orderData),
    sendMerchantNotificationEmail(orderData),
  ]);

  return {
    customer: customerResult,
    merchant: merchantResult,
  };
}
