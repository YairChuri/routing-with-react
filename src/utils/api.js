import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHeg9bjsozrw2E3VXTD9RTTpCOCNmM7IQ",
  authDomain: "vanlife-1cd11.firebaseapp.com",
  projectId: "vanlife-1cd11",
  storageBucket: "vanlife-1cd11.firebasestorage.app",
  messagingSenderId: "400478329806",
  appId: "1:400478329806:web:281b1ef7e9a9e7ef82699f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const vansCollectionRef = collection(db, "vans");
export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);

  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}
export async function getVan(id) {
  const vanDocRef = doc(db, "vans", id);
  const snapshot = await getDoc(vanDocRef);
  const van = {
    ...snapshot.data(),
    id: snapshot.id,
  };
  return van;
}
export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}
export async function getHostVan(id) {
  const q = query(
    vansCollectionRef,
    where("hostId", "==", "123"),
    where("id", "==", id)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const van = {
    ...snapshot.docs[0].data(),
    id: snapshot.docs[0].id,
  };
  console.log(van);
  return van;
}
