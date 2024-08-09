

import Button from "@/components/Button";
import prisma from "@/lib/db";

export default function Home() {


  async function addUnit() {
    "use server"

    const tags = [
      { title: 'اسبانية', img: '' },
      { title: 'بلجيكية', img: '' },
      { title: 'تركية	', img: '' },
      { title: 'يونانية	', img: '' },
      { title: 'ألمانية', img: '' },
      { title: 'أمريكية', img: '' },
      { title: 'أنقليزية', img: '' },
      { title: 'إيطالية', img: '' },
      { title: 'النمسا', img: '' },
      { title: 'برازيلية	', img: '' },
      { title: 'تونسية', img: '' },
      { title: 'جزائرية', img: '' },
      { title: 'سورية', img: '' },
      { title: 'لبنانية', img: '' },
      { title: 'سويدية', img: '' },
      { title: 'مصرية', img: '' },
      { title: 'مغربية', img: '' },
      { title: 'عالمية', img: '' },
      { title: 'متوسطي', img: '' },
      { title: 'عربية', img: '' },
      { title: 'عربية', img: '' },
      { title: 'مكسيكية', img: '' },
      { title: 'يابانية', img: '' },
    ];
  

    try {
      const result = await prisma.unit.createMany({
        data : tags
      })
      // const result = await prisma.tags.deleteMany({})
    
      console.log(`Inserted ${result.count} ingredients`);
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
