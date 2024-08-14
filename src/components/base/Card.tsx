import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
interface CardProps {
    imageUrl: string;
    title: string;
    id: string;
    className?: string;
}
const ImprovedCard = ({imageUrl, title, id}: CardProps) => {
  return (
    <Link href={`/collection/${id}`}>
    <div className="w-48 h-48 p-4  hover:transform hover:scale-105 transition-all">
    <Image
      src={imageUrl}
      alt="Picture of the author"
      width={192}
      height={192}
      className="w-full h-full object-cover rounded-md"
    />
    <p>{title}</p>
  </div>
  </Link>
  );
};

export default ImprovedCard;
