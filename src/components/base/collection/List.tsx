"use client";
import { getCollectionList } from "@/lib/firebase/FirebaseServes";
import { useEffect, useState } from "react";
import Item from "./Item";

interface DataItem {
  id: string;
  // Add other properties according to the data structure returned by Firebase
}

function List({ id }: { id: string }) {
  const [data, setData] = useState<DataItem[]>([]);
  
  useEffect(() => {
    async function getData() {
      try {
        const res = await getCollectionList(id);
        
        setData(
            res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]); // Added id to the dependency array
  
  return (
    <div className="p-5 border-t">
      {data.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {data.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl font-extrabold my-10 text-zinc-600">Not Found</div>
      )}
    </div>
  );
}

export default List;
