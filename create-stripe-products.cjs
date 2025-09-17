// Script to create products in Stripe
const stripe = require('stripe')('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');

const products = [
  {
    name: 'MGL Digital AI - Başlangıç Paketi',
    description: 'E-posta otomasyonu ve temel WhatsApp bot kurulumu. 1 ay teknik destek dahil.',
    price: 49700, // $497.00 in cents
    currency: 'usd',
    metadata: {
      package: 'basic',
      features: 'email_automation,whatsapp_bot,crm_integration,1_month_support'
    }
  },
  {
    name: 'MGL Digital AI - Profesyonel Paket',
    description: 'Gelişmiş AI otomasyonu ve reklam entegrasyonu. 2 ay teknik destek dahil.',
    price: 99700, // $997.00 in cents  
    currency: 'usd',
    metadata: {
      package: 'professional',
      features: 'all_basic,ai_voice_assistant,advanced_workflows,ads_integration,2_months_support'
    }
  },
  {
    name: 'MGL Digital AI - Kurumsal Paket',
    description: 'Tam özelleştirilebilir kurumsal otomasyon çözümü. 6 ay ücretsiz destek dahil.',
    price: 199700, // $1997.00 in cents
    currency: 'usd', 
    metadata: {
      package: 'enterprise',
      features: 'all_professional,custom_chatbot,unlimited_api,custom_dashboard,6_months_support,priority_support'
    }
  }
];

async function createProducts() {
  console.log('Creating Stripe products...');
  
  for (const productData of products) {
    try {
      // Create product
      const product = await stripe.products.create({
        name: productData.name,
        description: productData.description,
        metadata: productData.metadata
      });
      
      console.log(`✅ Product created: ${product.name} (ID: ${product.id})`);
      
      // Create price for the product
      const price = await stripe.prices.create({
        unit_amount: productData.price,
        currency: productData.currency,
        product: product.id,
        metadata: productData.metadata
      });
      
      console.log(`💰 Price created: $${productData.price/100} (ID: ${price.id})`);
      
      // Create payment link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        after_completion: {
          type: 'redirect',
          redirect: {
            url: 'https://5173-iiglwrm1u4pzf8qdabnsb-6532622b.e2b.dev/success'
          }
        },
        metadata: productData.metadata
      });
      
      console.log(`🔗 Payment Link created: ${paymentLink.url}`);
      console.log('---');
      
    } catch (error) {
      console.error(`❌ Error creating product ${productData.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 All products created successfully!');
  console.log('\nNext steps:');
  console.log('1. Copy the payment link URLs');
  console.log('2. Update src/lib/checkout.ts with the real URLs');
  console.log('3. Test the purchase flow');
}

createProducts().catch(console.error);