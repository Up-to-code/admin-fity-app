import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { HomeIcon, PlusIcon } from "@radix-ui/react-icons";

function Manu() {
  return (
    <Card className="w-[250px] h-full min-h-screen flex  flex-col  px-10 gap-3 text-xl font-semibold">
      <Link href={"/"} className="text-3xl font-bold mt-10   ">
        Fity Admin
      </Link>
      <Link
        href={"/"}
        className="  flex gap-2 items-center hover:bg-zinc-200 px-2 py-1 rounded"
      >
        <HomeIcon className="w-5 h-5" />
        Home
      </Link>
      <Link
        href={"/Create"}
        className="  flex gap-2 items-center hover:bg-zinc-200 px-2 py-1 rounded"
      >
        <PlusIcon className="w-5 h-5" />
        Create
      </Link>
    </Card>
  );
}

export default Manu;
