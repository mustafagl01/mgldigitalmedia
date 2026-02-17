# MGL Digital Media - AI Automation Platform

A modern React + TypeScript application with Cloudflare D1 authentication and Better Auth integration.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Authentication**: Better Auth + Cloudflare D1
- **Deployment**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)

## 📋 Prerequisites

- Node.js 18+ and npm
- Cloudflare account with Workers and D1 enabled
- Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/mustafagl01/mgldigitalmedia.git
cd mgldigitalmedia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Cloudflare D1 Database

Create a new D1 database:

```bash
# Create production database
npx wrangler d1 create mgl_digital_media_db

# Create development database (optional)
npx wrangler d1 create mgl_digital_media_db_dev
```

Note the `database_id` from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "mgl_digital_media_db"
database_id = "your-database-id-here"  # Replace with actual ID
```

### 4. Run database migrations

```bash
# Apply schema to production database
npx wrangler d1 execute mgl_digital_media_db --file=migrations/0001_init_auth.sql

# Or for development
npx wrangler d1 execute mgl_digital_media_db_dev --file=migrations/0001_init_auth.sql
```

### 5. Configure Cloudflare Workers secrets

```bash
# Set required secrets
npx wrangler secret put JWT_SECRET
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
```

### 6. Set up environment variables

Create a `.env` file in the root directory:

```env
# API URL for your Cloudflare Worker
VITE_API_URL=https://your-worker.your-subdomain.workers.dev
```

## 🚢 Deployment

### Deploy Cloudflare Worker

```bash
# Deploy to production
npx wrangler deploy

# Deploy to development
npx wrangler deploy --env development
```

### Build and deploy frontend

```bash
# Build the React app
npm run build

# Preview the build
npm run preview
```

For production deployment, you can deploy the `dist` folder to:
- Cloudflare Pages
- Netlify
- Vercel
- Any static hosting service

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Features

- Email/Password registration and login
- Google OAuth integration
- Password reset functionality
- Session management with secure token storage
- Protected routes and API endpoints

### Demo Account

- Email: `demo@mgldigitalmedia.com`
- Password: `Demo123`

## Live Deployment

The authentication API is deployed at:
- **API URL**: `https://mgl-digital-media-auth.mustafagl01.workers.dev`
- **Database**: Cloudflare D1 (WEUR region)

## 📁 Project Structure

```
mgldigitalmedia/
├── worker/
│   └── src/
│       └── auth-handler.ts    # Cloudflare Worker for auth endpoints
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── pages/             # Page components
│   │   ├── sections/          # UI sections
│   │   └── ui/                # UI components
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/
│   │   └── auth.ts            # Better Auth configuration
│   └── main.tsx               # App entry point
├── migrations/
│   └── 0001_init_auth.sql     # D1 database schema
├── wrangler.toml              # Cloudflare Workers config
├── vite.config.ts             # Vite configuration
└── package.json
```

## 🔧 API Endpoints

All authentication endpoints are served by the Cloudflare Worker:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/signin/google` - Initiate Google OAuth
- `GET /api/auth/callback/google` - Google OAuth callback

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Your Cloudflare Worker URL | Yes |
| `JWT_SECRET` | Secret for JWT tokens (Worker secret) | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID (Worker secret) | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret (Worker secret) | Optional |
| `STRIPE_SECRET_KEY` | Stripe API secret key (Worker secret) | Yes |

## 🐛 Troubleshooting

### Database connection issues

Make sure your `wrangler.toml` has the correct `database_id`:

```bash
# List your D1 databases
npx wrangler d1 list
```

### CORS errors

Ensure your Cloudflare Worker includes proper CORS headers. The worker is configured to allow all origins in development.

### Session not persisting

Check that `localStorage` is enabled in your browser and that the token is being stored correctly.

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.
