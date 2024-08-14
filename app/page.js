

import Button from "@/components/Button";
import prisma from "@/lib/db";

export default function Home() {


  async function addUnit() {
    "use server"


  const tags = [


  ];
  
  
    try {
      const result = await prisma.tips.createMany({
        data : tags
      })
      // const result = await prisma.origine.deleteMany({})
    
      console.log(`Inserted ${result.count} tips`);
    } catch (error) {
      console.log(error)
    }
  }
  



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HOME
  <Button addUnit={addUnit} className='border p-2' />
    </main>
  );
}









