import Image from "next/image";
import { IoIosPlay } from "react-icons/io";

const Item: React.FC = () => {
  return (
    <div className="relative h-48 w-48 rounded-md overflow-hidden group">
      <Image
        src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a5d9bc4a4739c8f0669ca09b"
        alt="Picture of the author"
        width={192}
        height={192}
        className="w-full h-full object-cover rounded-md transition-transform transform group-hover:scale-105"
      />
      <div className="absolute bottom-3 right-2 p-1 bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-100 cursor-pointer flex items-center justify-center">
        <IoIosPlay color="white" size={30} />
      </div>
    </div>
  );
}

export default Item;
