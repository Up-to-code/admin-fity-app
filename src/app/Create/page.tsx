import ImprovedCard from "@/components/base/Card";
import Createsheet from "@/components/base/Createsheet";
import GirdeOfcard from "@/components/base/GirdeOfcard";
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
     <GirdeOfcard />
    </div>
  );
}

export default page;
