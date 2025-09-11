const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const signature = event.headers['stripe-signature'];
    
    if (!signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No signature found' }),
      };
    }

    // Verify webhook signature
    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Webhook signature verification failed: ${error.message}` }),
      };
    }

    // Handle the event
    console.log('Received Stripe webhook:', stripeEvent.type);
    
    // You can add specific event handling here
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        console.log('Payment successful:', stripeEvent.data.object);
        break;
      case 'payment_intent.succeeded':
        console.log('Payment intent succeeded:', stripeEvent.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};