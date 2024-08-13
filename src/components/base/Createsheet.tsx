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

const Createsheet: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Card className="w-48 h-48 p-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="font-semibold mb-2">Create cool</h1>
            <div className="bg-purple-100 py-2 px-1 rounded-md flex items-center justify-center cursor-pointer">
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
                style={{ display: "none" }} // Hide the default file input
              />
            </label>
            {image && typeof image === "string" && (
              <div className="mt-4 mx-auto w-full flex justify-center">
                <Image
                  src={image}
                  alt="Selected"
                  className="max-w-full h-auto rounded-md shadow-md"
                  width={300} // Set appropriate width
                  height={300} // Set appropriate height
                />
              </div>
            )}
            <div className="mt-4">
              <Label className="text-gray-600">collection Name</Label>
              <Input className="w-full mt-2"  placeholder="Enter collection name"/>
            </div>
            <div className="mt-4">
              <Label className="text-gray-600">collection db</Label>
              <Input className="w-full mt-2"  placeholder="Enter collection db" />
            </div>

            <div className="mt-4">
                <Button>Create</Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Createsheet;
