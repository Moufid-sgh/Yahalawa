

import Button from "@/components/Button";
import prisma from "@/lib/db";

export default function Home() {


  async function addUnit() {
    "use server"

    const unit = [
      { title: 'قطع' },
      { title: 'أوراق' },
      { title: 'فصوص' },
      { title: 'ملليلتر' },
      { title: 'صل' },
      { title: 'ل' },
      { title: 'دسل' },
      { title: 'غرام' },
      { title: 'كغ' },
      { title: 'مغرفة صغيرة' },
      { title: 'مغرفة كبيرة' },
      { title: 'قطرات' },
      { title: 'أوراق' },
      { title: 'كوب' },
      { title: 'رشة' },
      { title: 'راس' },
      { title: 'عرف' },
      { title: 'حفنة' },
      { title: 'ربطة' },
      { title: 'كعبة' },
      { title: 'كعبات' },
      { title: 'ڨرن' },
      { title: 'ڨرون' }
      
    ];
  

    try {
      const result = await prisma.unit.createMany({
        data : unit
      })
    
      console.log(`Inserted ${result.count} unit`);
    } catch (error) {
      console.log(error)
    }
  }
  



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HOME
  <Button addUnit={addUnit} />
    </main>
  );
}
