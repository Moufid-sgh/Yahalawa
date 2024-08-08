

import Button from "@/components/Button";
import prisma from "@/lib/db";

export default function Home() {


  async function addUnit() {
    "use server"

    const tags = [
      { title: 'قالب التارت' },
      { title: 'خلاط' },
      { title: 'أعواد خشبية' },
      { title: 'شواية' },
      { title: 'كأس زجاجي' },
      { title: 'قالب' },
      { title: 'الخلاط الكهربائي' },
      { title: 'صحفة' },
      { title: 'ملعقة' },
      { title: 'شوكة' },
      { title: 'سكين' },
      { title: 'القدر' },
      { title: 'طبق' },
      { title: 'مقلاة' },
      { title: 'صحن' },
      { title: 'طبق الفور' },
      { title: 'كؤوس' },
      { title: 'الأسياخ الخشبية' },
      { title: 'قلقال' },
      { title: 'كيس' },
      { title: 'خفاقة يدوية' },
      { title: 'ملعقة خشبية' },
      { title: 'كاسارونة' },
      { title: 'وعاء معدني' },
      { title: 'الخفاقة الكهربائية' },
      { title: 'أوعية رامكنز' },
      { title: 'قالب دائري' },
      { title: 'قوالب الكاب كيك' },
      { title: 'قالب مربع' },
      { title: 'قالب الدونات' },
      { title: 'سكين حلويات' },
      { title: 'مصفات' },
      { title: 'قوالب السيليكون' },
      { title: 'الاشكال' },
      { title: 'كيس حلواني' },
      { title: 'ثلاثة قوالب' },
      { title: 'قالب ورقي' },
      { title: 'قالب مستطيل' },
      { title: 'القطاعة' },
      { title: 'طبق فرن' },
      { title: 'الاكواب' },
      { title: 'وعاء خزفي' },
      { title: 'قوالب التارت الصغيرة' },
      { title: 'قوالب دائرية صغيرة' },
      { title: 'الأوعية الورقية' },
      { title: 'الأوعية' },
      { title: 'أوعية زجاجية' },
      { title: 'قالب كايك (طول 25 سم)' },
      { title: 'قالب دائري (قطر 20 سم)' },
      { title: 'قالب دائري (قطر 25 سم)' },
      { title: 'قالب مربع (16 سم)' },
      { title: 'قالب مربع (20 سم)' },
      { title: 'قالب مستطيل (24*16 سم)' },
      { title: 'قالب دائري (قطر 22 سم)' }       
    ];
  

    try {
      const result = await prisma.ustensiles.createMany({
        data : tags
      })
      // const result = await prisma.tags.deleteMany({})
    
      console.log(`Inserted ${result.count} tags`);
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
