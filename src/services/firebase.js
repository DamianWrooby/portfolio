import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db;

export const firebaseConfig = {
	apiKey: process.env.GATSBY_FIREBASE_API_KEY,
	authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
	storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.GATSBY_FIREBASE_APP_ID,
	measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
	db = getFirestore();
}

export { db };
