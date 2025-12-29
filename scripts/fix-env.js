const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

const content = `# ===================================
# OFF-RADAR - ENVIRONMENT VARIABLES
# ===================================

# ===================================
# FIREBASE CLIENT (Public - Browser)
# ===================================
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA9TOKuprl3I56yvSWVCBQoYuz5r2pAp5c
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=off-radar-18a78.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=off-radar-18a78
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=off-radar-18a78.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=997127125648
NEXT_PUBLIC_FIREBASE_APP_ID=1:997127125648:web:8029b28dad56a6c05c3615
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-9WZMM3GFH5

# ===================================
# FIREBASE ADMIN (Secret - Server Only)
# ===================================
# Required for server-side verification and Vertex AI to work securely.
# You still need to download the Service Account Key JSON.
FIREBASE_ADMIN_PROJECT_ID=off-radar-18a78
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# ===================================
# GOOGLE CLOUD VERTEX AI
# ===================================
GCP_PROJECT_ID=off-radar-18a78
GCP_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-2.0-flash-exp

# ===================================
# SETUP STATUS
# ===================================
FIREBASE_CONFIGURED=true
`;

fs.writeFileSync(envPath, content, { encoding: 'utf8' });
console.log('Successfully wrote .env.local with UTF-8 encoding');
