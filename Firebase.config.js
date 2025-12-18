
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "stelblogsite.firebaseapp.com",
  databaseURL: "https://stelblogsite-default-rtdb.firebaseio.com",
  projectId: "stelblogsite",
  storageBucket: "stelblogsite.appspot.com",
  messagingSenderId: "318855763352",
  appId: "1:318855763352:web:d944f5dfbdec90df4807ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();