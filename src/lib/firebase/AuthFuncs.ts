import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const SignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};


