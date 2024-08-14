import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebase/firebaseConfig";

interface ItemProps {
  name: string;
  url: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Item: React.FC<ItemProps> = ({ name, url, createdAt, updatedAt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchDownloadUrl = async () => {
      const storageRef = ref(storage, url);
      const downloadUrl = await getDownloadURL(storageRef);
      setDownloadUrl(downloadUrl);
    };
    fetchDownloadUrl();
  }, [url]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-64 w-64 rounded-md overflow-hidden group bg-gray-800 shadow-lg">
      <Image
        src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a5d9bc4a4739c8f0669ca09b"
        alt="Audio Thumbnail"
        width={256}
        height={256}
        className="w-full h-full object-cover rounded-md transition-transform transform group-hover:scale-105"
      />
      <audio ref={audioRef} src={downloadUrl || ""} preload="metadata" />
      <div
        onClick={togglePlay}
        className="absolute bottom-3 right-2 p-3 bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-100 z-10 cursor-pointer flex items-center justify-center"
      >
        <div className="z-10">
          {
            downloadUrl ? (
              isPlaying ? (
                <IoIosPause color="white" size={30} />
              ) : (
                <IoIosPlay color="white" size={30} />
              )
            ) : <AiOutlineLoading3Quarters className="animate-spin"  color="#fff"/>

          }
        </div>
      </div>
      <div className="absolute bottom-0 left-0 bg-black/70 w-full p-3 text-center">
        <p className="text-white text-lg font-bold truncate">{name}</p>
        <p className="text-gray-300 text-xs">
          Created: {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-300 text-xs">
          Updated: {new Date(updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Item;
