"use client";
import { useEffect } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import useUser from "@/lib/store/user";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { SignInWithGoogle } from "@/lib/firebase/AuthFuncs";
import Image from "next/image";

function Navbar() {
  const { user, setUser } = useUser();

  // Use useEffect to run onAuthStateChanged only once when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="px-10 flex items-center justify-between bg-white border-b border-gray-200 py-4">
      <h1 className="text-xl font-bold">Fity Admin</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{user.displayName}</p>

            <Image
              src={user.photoURL || ""}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
              width={32}
              height={32}
            />
          </div>
        ) : (
          <Button className="font-bold" onClick={SignInWithGoogle}>
            <FaGoogle className="mr-2" /> Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
