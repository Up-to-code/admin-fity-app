"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updateMuiscInfoCollectionListMusics } from "@/lib/firebase/FirebaseServes";
import { useEffect, useState } from "react";
interface DialogEditNameOfMuiscProps {
  children: React.ReactNode;
  id: string;
  muisc_id: string;
  name: string;
}
export function DialogEditNameOfMuisc({
  children,
  id,
  muisc_id,
  name,
}: DialogEditNameOfMuiscProps) {
  const [text, setText] = useState(name);
  const {toast} = useToast();
  async function update() {
    if (!text) {
      toast({
        title: "Name is required",
        description: "Please enter a name.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateMuiscInfoCollectionListMusics(id, muisc_id, { name: text });
     toast({
        title: "Success",
        description: "Name updated successfully.",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",      
        description: "Failed to update name.",
        variant: "destructive",
      });
    } finally {
      setText("");
      toast({
        title: "Success",
        description: "Name updated successfully.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to Name of Muisc</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={name}
              className="col-span-3"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={update} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
