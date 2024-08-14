"use client";
import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { uploadCollectionListMusics } from "@/lib/firebase/FirebaseServes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig"; // Adjust the import based on your project structure

interface AudioUploadCardProps {
  id: string;
}

const AudioUploadCard: React.FC<AudioUploadCardProps> = ({ id }) => {
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadCount, setUploadCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchUploadCount() {
      try {
        const docRef = doc(db, "muisces", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUploadCount(docSnap.data().uploadCount || 0);
        }
      } catch (error) {
        console.error("Error fetching upload count:", error);
      }
    }

    fetchUploadCount();
  }, [id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setFileName(file.name);
      setAudioFile(file);
      setErrorMessage(""); // Clear any previous errors
    } else {
      setFileName("");
      setErrorMessage("Please select a valid audio file.");
      e.target.value = ""; // Clear the input
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setFileName(file.name);
      setAudioFile(file);
      setErrorMessage(""); // Clear any previous errors
    } else {
      setFileName("");
      setErrorMessage("Please select a valid audio file.");
    }
  };

  const handleUploadClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input click
    }
  };

  const handleSubmitClick = async () => {
    if (fileName && audioFile) {
      setIsLoading(true); // Start loading state
      try {
        await uploadCollectionListMusics(id, audioFile, { name: fileName });
        setUploadCount(prevCount => prevCount + 1); // Increment the upload count in state
        setFileName(""); // Clear file name after successful upload
        setAudioFile(null); // Clear selected file
        alert(`File "${fileName}" uploaded successfully!`);
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage("Failed to upload file. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading state
      }
    } else {
      alert("Please select an audio file first.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white rounded-lg shadow-lg space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-800">
              Upload Audio File
            </h1>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleUploadClick} // Trigger file input click on div click
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <Music className="text-blue-500 w-10 h-10" />
              <span className="ml-2 text-gray-600">
                Drag & drop your audio file here, or click to select
              </span>
            </div>
            <input
              id="audioUpload"
              type="file"
              accept="audio/*"
              ref={fileInputRef} // Reference to the hidden input
              onChange={handleFileChange}
              className="hidden"
            />
            {fileName && (
              <div className="text-sm text-green-600">
                Selected file: <strong>{fileName}</strong>
              </div>
            )}
            {errorMessage && (
              <div className="text-sm text-red-600">{errorMessage}</div>
            )}
            <Button
              type="button"
              onClick={handleSubmitClick} // Handle actual upload submission
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
            {uploadCount >= 0 && (
              <div className="text-sm text-gray-600 mt-4">
                Total uploads: <strong>{uploadCount}</strong>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AudioUploadCard;
