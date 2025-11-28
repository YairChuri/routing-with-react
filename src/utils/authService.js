import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./api";

export const loginUser = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
