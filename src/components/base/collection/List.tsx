"use client";
import { getCollectionList } from "@/lib/firebase/FirebaseServes";
import { useEffect, useState } from "react";
import Item from "./Item";
import AudioUploadCard from "./AddMuisc";
import { motion, AnimatePresence } from "framer-motion";

interface DataItem {
  id: string;
  name: string;
  url: string;
  CreatedAt: string; // ISO date string
  UpdatedAt: string; // ISO date string
}

function List({ id }: { id: string }) {
  const [data, setData] = useState<DataItem[]>([]);
  const [isUploadCardVisible, setIsUploadCardVisible] = useState<boolean>(
    false
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Start loading state
      try {
        const res = await getCollectionList(id);
        const fetchedData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as DataItem[];
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End loading state
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="p-5 border-t">
      <div className="text-2xl font-extrabold mb-4">
        <h1>Add in {id}</h1>
      </div>

      <button
        onClick={() => setIsUploadCardVisible(!isUploadCardVisible)}
        className="px-4 py-2 mb-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
      >
        {isUploadCardVisible ? "Hide Upload Card" : "Show Upload Card"}
      </button>

      <AnimatePresence>
        {isUploadCardVisible && (
          <motion.div
            key="audioUploadCard"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AudioUploadCard id={id} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-5 bg-white rounded shadow-md"
      >
        {isLoading ? (
          <div className="text-center text-2xl font-extrabold my-10 text-zinc-600">
            Loading...
          </div>
        ) : data.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            <AnimatePresence>
              {data.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Item
                    name={item.name}
                    url={item.url}
                    createdAt={item.CreatedAt}
                    updatedAt={item.UpdatedAt}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center text-2xl font-extrabold my-10 text-zinc-600">
            Not Found
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default List;
