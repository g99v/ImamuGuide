import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnbrmPS3vpIs-NuU3DDMhcEgAqx2roXf0",
  authDomain: "imamu-guide.firebaseapp.com",
  projectId: "imamu-guide",
  storageBucket: "imamu-guide.firebasestorage.app",
  messagingSenderId: "517446189521",
  appId: "1:517446189521:web:e7e85f761515cbd0fba0f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export for use in other files
export { app, auth };