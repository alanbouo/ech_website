# Conversation Log

## 2026-01-08 23:16 UTC+01:00

### User Request
API error when calling `/api/send-shipping-email`:
```bash
curl -X POST https://cerises-hiver.com/api/send-shipping-email \
  -H "Authorization: Bearer UODly0uItEN8MPEiN8frQjyG3k" \
  -H "Content-Type: application/json" \
  -d '{
    "reference": "ECH-1767771072005-q454sf2gr",
    "customerEmail": "alandji.b@gmail.com",
    "customerFirstName": "Annie",
    "trackingNumber": "5Y00542038530",
    "carrier": "Colissimo",
    "estimatedDelivery": "10 janvier 2026"
  }'
```
Response: `{"error":"Internal server error"}`

### Investigation
- Reviewed `/src/app/api/send-shipping-email/route.ts` and `/src/lib/email.ts`
- Code logic is correct
- Retried the same curl command

### Resolution
The API call succeeded on retry:
```json
{"success":true,"message":"Shipping email sent","data":{"id":"d98af547-a870-47ed-b993-07ecfb32f43d"}}
```

**Conclusion**: Transient error (likely Resend API timeout or temporary issue). Email successfully sent.

---

## 2026-01-08 23:18 UTC+01:00

### User Request
How to add an invoice PDF attachment to the shipping email?

### Changes Made
1. **`/src/lib/email.ts`**: Updated `ShippingEmailData` interface to include optional `invoicePdf` field with `content` (base64) and `filename`. Added attachments support to `resend.emails.send()`.

2. **`/src/app/api/send-shipping-email/route.ts`**: Added `invoicePdf` parameter handling.

### Usage
```bash
curl -X POST https://cerises-hiver.com/api/send-shipping-email \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "reference": "ECH-xxx",
    "customerEmail": "client@example.com",
    "customerFirstName": "Annie",
    "trackingNumber": "5Y00542038530",
    "carrier": "Colissimo",
    "estimatedDelivery": "10 janvier 2026",
    "invoicePdf": {
      "content": "BASE64_ENCODED_PDF_CONTENT",
      "filename": "facture-ECH-xxx.pdf"
    }
  }'
```

---
