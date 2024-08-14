import Header from "@/components/base/collection/Header";
import List from "@/components/base/collection/List";

function page({ params }: { params: { id: string } }) {
  
  return <div>
    <Header id={params.id} />
     <List id={params.id} />

  </div>;
}

export default page;
