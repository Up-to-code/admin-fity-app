/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}
function Header({ id }: Props) {
  const refdoc = doc(db, "muisces", id);
  const [docData, setDocData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await getDoc(refdoc);
        setDocData(res.data());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);
  return (
    <div className="w-full  p-5 flex">
     {
      docData.image ? (
        <Image
          src={docData.image}
          alt="Picture of the author"
          width={192}
          height={192}
          className=" w-48 h-48 object-cover rounded-md"
        />
      ) : (
        <div className="w-48 h-48 object-cover rounded-md" />
      )
     }
      <div className="flex-1 px-4">
        <h1 className="text-2xl font-bold">{docData?.name}</h1>
        <p className="text-base">{docData?.DB_Name}</p>
      </div>
    </div>
  )
}

export default Header;
