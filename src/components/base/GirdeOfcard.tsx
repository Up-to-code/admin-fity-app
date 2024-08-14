"use client";
import Image from "next/image";
import ImprovedCard from "./Card";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { Skeleton } from "../ui/skeleton";

function GirdeOfcard() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const docs = collection(db, "muisces");
    async function getData() {
      try {
        setLoading(true);
        const res = await getDocs(docs);
        setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {data ? (
        data.map((item: any) => (
          <ImprovedCard
            key={item.id}
            title={item.name}
            imageUrl={item.image}
            id={item.id}
          />
        ))
      ) : (
        <>
          <Skeleton className="h-48 w-48 rounded-xl" />
        </>
      )}
  {
    loading && (
      <>
      
          <Skeleton className="h-48 w-48 rounded-xl" />
          <Skeleton className="h-48 w-48 rounded-xl" />
          <Skeleton className="h-48 w-48 rounded-xl" />
          <Skeleton className="h-48 w-48 rounded-xl" />
         
     
      </>
    )
  }
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
  );
}

export default GirdeOfcard;
