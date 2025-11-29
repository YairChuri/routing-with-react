import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
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
export async function getHostVans(hostId) {
  console.log("host id: ", hostId);
  const q = query(vansCollectionRef, where("hostId", "==", hostId));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}
export async function getHostVan(id, hostId) {
  const q = query(
    vansCollectionRef,
    where("hostId", "==", hostId),
    where("id", "==", id)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const van = {
    ...snapshot.docs[0].data(),
    id: snapshot.docs[0].id,
  };
  return van;
}

export async function createUser(
  name,
  email,
  password,
  id = "789",
  role = "admin"
) {
  try {
    // 1️⃣ Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    // 2️⃣ Save additional info to Firestore
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      role,
      id,
    });

    // 3️⃣ At this point, user is automatically signed in
    return userCredential.user;
  } catch (err) {
    console.error("Failed to create user", err);
    throw err; // so your Signup component can show the error
  }
}
