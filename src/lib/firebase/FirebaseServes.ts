import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// collection / list
export async function getCollectionList(id: string) {
  const collRef = collection(db, "muisces", id, "list");
  try {
    const res = await getDocs(collRef);
    return res;
  } catch (error) {
     throw error
  }
}
