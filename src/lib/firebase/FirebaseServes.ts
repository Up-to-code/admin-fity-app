import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

// collection / list
export async function getCollectionList(id: string) {
  const collRef = collection(db, "muisces", id, "list");
  try {
    const res = await getDocs(collRef);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function uploadCollectionListMusics(
  id: string,
  file: File,
  data: {
    name: string;
  }
) {
  try {
    const RefStorage = ref(storage, `muisces/${id}/list/${file.name}`);

    await uploadBytes(RefStorage, file).then(async (snapshot) => {
      try {
        // Add file info to Firestore
        await addDoc(collection(db, "muisces", id, "list"), {
          name: data.name,
          url: snapshot.ref.fullPath,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        });

        // Update upload count
        const counterRef = doc(db, "muisces", id);
        await updateDoc(counterRef, {
          uploadCount: increment(1), // Increment the upload count
        });
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function updateMuiscInfoCollectionListMusics(
  id: string,
  muisc_id: string,
  data: { name: string }
) {
  try {
    const docRef = doc(db, "muisces", id, "list", muisc_id);
    await updateDoc(docRef, {
      name: data.name,
      UpdatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
}
