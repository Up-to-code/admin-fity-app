"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState, ChangeEvent } from "react";
import { Card } from "../ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { db, storage } from "@/lib/firebase/firebaseConfig";
import { getBytes, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Createsheet: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dbName: "",
    imageFile: null as File | null,
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.dbName || !form.imageFile) {
        throw new Error("Please fill all the fields");
      }

      setIsLoading(true);

      // Upload image to Firebase Storage
      const imageUrl = await handleImageUpload(form.imageFile);

      // Save data to Firestore
      await saveDataToFirestore(form.name, form.dbName, imageUrl);

      toast({
        title: "Success",
        description: "Your music collection has been created",
      });

      // Reset form
      setForm({ name: "", dbName: "", imageFile: null });
      setImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const imageRef = ref(storage, `images/${file.name}`);

      await uploadBytes(imageRef, file).then((snapshot) => {
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      });
      return await getDownloadURL(imageRef);
    } catch (error) {
      throw new Error(
         error as string
      );
    }
  };

  const saveDataToFirestore = async (
    name: string,
    dbName: string,
    imageUrl: string
  ) => {
    try {
      // Reference to the collection (it will be created if it doesn't exist)
      const ref = doc(db, "muisces", dbName);
  
      // Add the document to the collection
      await setDoc(ref, {
        name,
        image: imageUrl,
        DB_Name: dbName,
      });
  
      console.log("Document added successfully to Firestore.");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      throw new Error("Failed to save data to Firestore");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        setForm({ ...form, imageFile: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        throw new Error("No file selected");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load image",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="w-48 h-48 p-4 flex flex-col items-center justify-center cursor-pointer">
          <div className="text-center">
            <h1 className="font-semibold mb-2">Create Collection</h1>
            <div className="bg-purple-100 py-2 px-1 rounded-md flex items-center justify-center">
              <PlusIcon className="w-8 h-8" color="#892CDC" />
            </div>
          </div>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[calc(100%-2rem)] max-w-2xl mx-auto">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-xl font-bold">Upload Your Image</h1>
          </SheetTitle>
          <SheetDescription>
            <label
              htmlFor="file-input"
              className="block text-center p-4 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-600">Choose an image</span>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            {image && (
              <div className="mt-4 mx-auto w-full flex justify-center">
                <Image
                  src={image}
                  alt="Selected"
                  className="max-w-full h-auto rounded-md shadow-md"
                  width={300}
                  height={300}
                />
              </div>
            )}
            <div className="mt-4">
              <Label className="text-gray-600">Collection Name</Label>
              <Input
                className="w-full mt-2"
                placeholder="Enter collection name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <Label className="text-gray-600">Collection DB</Label>
              <Input
                className="w-full mt-2"
                placeholder="Enter collection db"
                value={form.dbName}
                onChange={(e) => setForm({ ...form, dbName: e.target.value })}
              />
            </div>

            <div className="mt-4">
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Createsheet;
