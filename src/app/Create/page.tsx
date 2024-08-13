import Createsheet from "@/components/base/Createsheet";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="p-8 min-h-full">
      <Createsheet />
      <div>
        <p className="text-center text-zinc-500 my-8">
          -----------or-----------
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-48 h-48 p-4">
          <Image
            src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c56064d701bf051729347277"
            alt="Picture of the author"
            width={192}
            height={192}
            className="w-full h-full object-cover rounded-md"
          />
          <p>Jazz and blues</p>
        </div>

        <div className="w-48 h-48 p-4">
          <Image
            src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a5d9bc4a4739c8f0669ca09b"
            alt="Picture of the author"
            width={192}
            height={192}
            className="w-full h-full object-cover rounded-md"
          />
          <p>Jazz and blues</p>
        </div>

        <div className="w-48 h-48 p-4">
          <Image
            src="https://i.scdn.co/image/ab67616d00001e023f33a4b286ad229b5cf5b848"
            alt="Picture of the author"
            width={192}
            height={192}
            className="w-full h-full object-cover rounded-md"
          />
          <p>Jazz and blues</p>
        </div>

        <div className="w-48 h-48 p-4">
          <Image
            src="https://i.scdn.co/image/ab67616d00001e028c08e995f156889c114a968a"
            alt="Picture of the author"
            width={192}
            height={192}
            className="w-full h-full object-cover rounded-md"
          />
          <p>Jazz and blues</p>
        </div>

        <div className="w-48 h-48 p-4">
          <Image
            src="https://i.scdn.co/image/ab67616d0000b27334e2e3c2501c07b3a4d4128e"
            alt="Picture of the author"
            width={192}
            height={192}
            className="w-full h-full object-cover rounded-md"
          />
          <p>Jazz and blues</p>
        </div>
      </div>
    </div>
  );
}

export default page;
