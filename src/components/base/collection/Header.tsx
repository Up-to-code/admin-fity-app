/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import { db, storage } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Loader2, Pencil, Save } from "lucide-react";

interface Props {
  id: string;
}

interface DocData {
  name?: string;
  DB_Name?: string;
  image?: string;
}

function Header({ id }: Props) {
  const refdoc = doc(db, "muisces", id);
  const [docData, setDocData] = useState<DocData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await getDoc(refdoc);
        setDocData(res.data() as DocData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `images/${id}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          if (docData?.image) {
            await deleteObject(ref(storage, docData.image));
          }
          await updateDoc(refdoc, { image: imageUrl });
          setDocData((prev) => ({ ...prev, image: imageUrl }));
          setUploadProgress(null);
        }
      );
    }
  };

  const handleSave = async () => {
    if (docData) {
      await updateDoc(refdoc, { name: docData.name });
      setIsEdit(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[250px] flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <motion.div
      className="w-full p-5 flex space-y-4  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-48 h-48 relative mb-4"
      >
        {docData?.image ? (
          <Image
            src={docData.image}
            alt="Profile Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        ) : (
          <div className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </motion.div>

      <div className="flex-1 px-9">
        <div>
          <h1 className="text-2xl font-bold">{docData?.name}</h1>
          <p className="text-base text-gray-500">{docData?.DB_Name}</p>
        </div>

        <div className="flex items-center space-x-2 my-4">
          <Button onClick={() => setIsEdit(!isEdit)} variant="outline">
            {isEdit ? <Save className="mr-2" /> : <Pencil className="mr-2" />}
            {isEdit ? "Save" : "Edit"}
          </Button>
        </div>

        {uploadProgress !== null && (
          <Progress value={uploadProgress} className="w-full mb-4" />
        )}
      </div>

      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent>
          <DialogTitle>Edit Details</DialogTitle>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <Input
              type="text"
              value={docData?.name || ""}
              onChange={(e) => setDocData({ ...docData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter name"
            />
            <Button onClick={handleSave} className="mt-4">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default Header;