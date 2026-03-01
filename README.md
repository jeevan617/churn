# CHURN.AI - Predictive Churn Analysis

CHURN.AI is a predictive churn analysis application with a "crazy as hell" highly dynamic, neon-themed, and interactive 3D 
UI. It functions as a complete Next.js 15 template using the App Router, incorporating tools like Framer Motion for animations, Better-SQLite3 for database interactions, and Spline for 3D real-time interactions.

## 🚀 Features

- **Interactive 3D UI**: Real-time interactive 3D canvas (Spline) built directly into the homepage, fully responsive to the user's cursor.
- **Neon / Glassmorphism Aesthetic**: Dark mode, blurred backgrounds, dynamic gradients, and custom scrollbars. 
- **Full Authentication System**: End-to-end user authentication with SQLite database using `better-sqlite3`, `bcryptjs`, and JSON Web Tokens (`jsonwebtoken`).
- **Dashboard**: A dedicated operational center filled with mocked predictive churn data elements and dynamic hover effects.
- **Framer Motion Elements**: Liquid micro-animations accompanying page transitions and elements snapping into view.

---

## 🛠 Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher

---

## 🏃 How to Run the Project

1. **Clone or Extract the Repository:**
If you have just unzipped the project, open the extracted directory in your terminal:
```bash
cd chrunprediction
```

2. **Install Dependencies:**
Run the following command to install all the necessary packages:
```bash
npm install
```

3. **Database Initialization:**
The project uses SQLite as the standard storage. To use it, simply start the app—the initialization logic built into `/src/lib/db.ts` will automatically execute `CREATE TABLE IF NOT EXISTS` commands and generate a `churn.db` file in the root folder upon your first request. 

4. **Start the Development Server:**
Start the Next.js development server by running:
```bash
npm run dev
```

5. **Visit the UI:**
Once the server is running, open your browser and navigate to:
```
http://localhost:3000
```

---

## 🗄 Project Structure

* `/src/app/page.tsx`: The main landing page hosting the Spline cursor-reactive 3D scene.
* `/src/app/globals.css`: Handles core styling and neon properties.
* `/src/app/dashboard/page.tsx`: Contains the operational metrics structure. 
* `/src/app/api/auth/*`: Contains `better-sqlite3` integrated authentication endpoints (`/login`, `/register`, `/logout`).
* `/src/lib/db.ts`: Handles connecting to `churn.db`.

---

## 👨‍💻 Authentication Setup

Currently, there are no default users. The easiest way to browse the dashboard is to:
1. Hit **Sign Up** from the Navigation Bar.
2. Enter a Designation (Name), Email, and Password.
3. Click **Generate Identity**. 
4. Hit **Login** with those same credentials.
5. Watch the dashboard come to life. 

Enjoy exploring the metrics and trying out the interactive Spline scene on the front page!
