# Éditions Cerises d'Hiver - Website

A Next.js e-commerce website for a French book publishing house with SumUp payment integration.

## Features

- 📚 Book catalog with detailed product pages
- 🛒 Shopping cart with persistent storage
- 💳 SumUp payment integration (redirect to SumUp hosted checkout)
- 📱 Responsive design
- 🇫🇷 French language interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Payment**: SumUp Checkout API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SumUp merchant account

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

3. Add your SumUp credentials to `.env.local`:

```env
SUMUP_API_KEY=your_sumup_api_key_here
SUMUP_MERCHANT_CODE=your_merchant_code_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Add book cover images to `/public/images/`:
   - `je-te-hais.jpg`
   - `le-costume-de-soi.jpg`
   - `tu-ne-seras-pas.jpg`

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## SumUp Integration

This site uses SumUp's hosted checkout for payment processing. When a customer proceeds to checkout:

1. Customer fills in shipping information
2. An API call creates a SumUp checkout session
3. Customer is redirected to SumUp's secure payment page
4. After payment, customer is redirected back to the success page

### Setting up SumUp

1. Create a SumUp merchant account at [sumup.com](https://sumup.com)
2. Go to the [SumUp Developer Portal](https://developer.sumup.com/)
3. Create an API application to get your API key
4. Find your Merchant Code in your SumUp dashboard

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── create-checkout/
│   ├── checkout/          # Checkout flow
│   ├── marie-capucin/     # Author page
│   ├── mentions-legales/  # Legal pages
│   ├── panier/            # Cart page
│   └── publications/      # Book catalog
├── components/            # React components
├── data/                  # Static data (books)
├── store/                 # Zustand store
└── types/                 # TypeScript types
```

## Deployment

The site can be deployed to Vercel or any platform supporting Next.js:

```bash
npm run build
npm start
```

For production, update `NEXT_PUBLIC_BASE_URL` to your production domain.

## License

All rights reserved. © Éditions Cerises d'Hiver
