export interface Payment {
    stripeInvoiceId: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    customer_email: string;
    priceId: string;
    status: string;
    amount_paid: number;
    currency: "eur" |"usd";
    tax?: number;
    payment_intent_id: string;
    metadata?: Record<string, string>;
    description?: string;
    invoice_pdf_url?: string;
    userId?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  