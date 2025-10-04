export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: number;
  currency?: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_Sxn47GSJfILlh4',
    priceId: 'price_1S1rU8DsBtMM0UXXyLmDaNfc',
    name: 'Otomasyon',
    description: 'İşletmenizin dijital dönüşümü için tasarlanmış kapsamlı AI otomasyon çözümü. Müşteri iletişiminden satış süreçlerine, veri yönetiminden raporlamaya kadar tüm iş akışlarınızı akıllı sistemlerle otomatikleştirerek verimliliğinizi artırın ve maliyetlerinizi düşürün.',
    mode: 'payment',
    price: 500,
    currency: 'GBP'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};