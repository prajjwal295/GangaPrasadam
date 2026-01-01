import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9_IaHpg9rvk2w2kEsdkswg7-PGmUw8J8",
  authDomain: "fir-3f922.firebaseapp.com",
  projectId: "fir-3f922",
  storageBucket: "fir-3f922.appspot.com",
  messagingSenderId: "705801770142",
  appId: "1:705801770142:web:05a3273b16fb543c57578f",
  measurementId: "G-1YBVY97S5F",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { analytics };
