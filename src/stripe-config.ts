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
    description: 'İşletmenizin verimliliğini artırmak için size özel olarak tasarlanan ve kurulan otomasyon sisteminin kurulum bedelidir. Bu bedel, size gönderilen teklifte belirtilen [Proje Adı, örn: "Sesli AI Asistan Kurulumu"] projesini kapsamaktadır.',
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