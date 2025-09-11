# Echo Blog 📝

[Live Demo](https://blog-application-d350b.web.app/) 

Echo Blog is a modern blogging platform built with the **MERN stack** and **Firebase Authentication**.  
It allows users to create, edit, responsive, and user-friendly interface.  

---

## Features

- **Authentication**
  - Email & Password Sign Up / Sign In
  - Google Sign-In (with Popup flow)
  - Password reset

- **Blog Management**
  - Create new blog posts
  - Edit existing blogs
  - Delete your own blogs
  - View blogs from other users

- **UI/UX**
  - Responsive design with Tailwind CSS
  - Dark/Light theme support
  - Toast notifications for feedback

- **Tech Highlights**
  - Protected routes with React Router
  - Firebase Hosting + Firestore Database
  - Context API for Auth, Theme, and Modal management

---

## **Tech Stack**

**Frontend:** React, Tailwind CSS, React Router, Context API  
**Backend/Database:** Firebase (Auth + Firestore)  
**Deployment:** Firebase Hosting  

---

## Project Structure

```bash
echo-blog/
│── public/ # Static assets
│── src/
│ ├── components/ # Reusable UI components
│ ├── contexts/ # Auth, Theme, Modal Providers
│ ├── firebase/ # Firebase config & helpers
│ ├── utils/ # Utility/helper functions
│ ├── App.jsx # Main app routes
│ ├── index.css # Global styles
│ └── main.jsx # Entry point (Vite + ReactDOM)
│── .firebaserc # Firebase project config
│── firebase.json # Firebase hosting config
│── index.html # Vite template
│── package.json # Dependencies & scripts
│── vite.config.js # Vite configuration
│── README.md # Project documentation
```


---

## Setup Instructions

### Clone the repo
```bash
git clone https://github.com/your-username/echo-blog.git
cd echo-blog
```

```bash
npm install
```

## Configure Firebase

 - Create a Firebase project in Firebase Console

 - Enable Authentication → Email/Password and Google Sign-in

 - Add your Firebase config in src/firebase/firebase.js

```bash
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

```bash
npm run dev
```

```bash
firebase deploy
```

### Contributing

 - Contributions are welcome!
 - Feel free to fork this repo and submit a PR with improvements.

### License

This project is licensed under the MIT License.