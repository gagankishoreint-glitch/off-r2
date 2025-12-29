# 🔥 Quick Firebase Setup for Off-Radar

## Your Google Account is Ready!

I can see you're logged into Firebase. Here's how to connect it to Off-Radar:

---

## Step 1: Create a New Firebase Web App (2 minutes)

1. **Go to Firebase Console**: Already open in your browser!

2. **Go to Your Project** or **Create New Project**:
   - Project name: `off-radar-prod` (or your preferred name)
   - Disable Google Analytics (optional for this project)
   - Click "Create Project"

3. **Add a Web App**:
   - Click **⚙️ Settings** → **Project settings**
   - Scroll to "Your apps"
   - Click **</>** (Web icon)
   - App nickname: `Off-Radar Web`
   - ✅ Also set up Firebase Hosting (optional)
   - Click **Register app**

4. **Copy Your Config**:
   You'll see something like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "off-radar-prod.firebaseapp.com",
     projectId: "off-radar-prod",
     storageBucket: "off-radar-prod.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456:web:abc123"
   };
   ```

---

## Step 2: Enable Firebase Services (3 minutes)

### A. Enable Firestore Database
1. In left sidebar, click **Firestore Database**
2. Click **Create database**
3. **Start in test mode** (we'll secure it later)
4. Choose location: **asia-south1** (Mumbai)
5. Click **Enable**

### B. Enable Authentication
1. In left sidebar, click **Authentication**
2. Click **Get started**
3. Click **Google** in the Sign-in providers list
4. Toggle **Enable**
5. Support email: `gagankb2006@gmail.com` (your email)
6. Click **Save**

### C. Enable Email/Password (Optional)
1. Still in **Authentication** → **Sign-in method**
2. Click **Email/Password**
3. Toggle **Enable**
4. Click **Save**

---

## Step 3: Get Service Account for Server-Side (2 minutes)

1. Go to **Project settings** → **Service accounts** tab
2. Click **Generate new private key**
3. Click **Generate key** (downloads JSON file)
4. **Keep this file secret!**

---

## Step 4: Enable Vertex AI API (2 minutes)

1. In Firebase console, click **☰ Menu** → **Google Cloud Console**
2. Or go to: https://console.cloud.google.com/
3. Select your Firebase project
4. In the search bar, type "Vertex AI API"
5. Click **Vertex AI API**
6. Click **ENABLE**
7. If prompted for billing, add a payment method (free tier covers moderate usage)

---

## Step 5: Create .env.local File

I'll create this file for you once you provide the config values. You can either:

**Option A: Paste Your Values Here**Send me:
- The `firebaseConfig` object from Step 1
- Or just tell me you're ready, and I'll help you format it

**Option B: I'll Create a Template**
I can create a `.env.local` file with placeholders, and you fill them in.

---

## What to Expect After Setup

✅ **Google Sign-In Button** will work  
✅ **User Authentication** fully functional  
✅ **Real AI** instead of demo mode  
✅ **Data Persistence** to Firestore  
✅ **User Profiles** saved to cloud  

---

## Ready to Continue?

**Tell me one of these:**

1. **"I've created the project and enabled services"** - I'll guide you through copying the config

2. **"Create the .env template"** - I'll make a template file you can fill in

3. **"Here's my firebaseConfig: {...}"** - Paste the config and I'll set it up instantly

Which would you like to do?
