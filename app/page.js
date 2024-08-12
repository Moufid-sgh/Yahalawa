

import Button from "@/components/Button";
import prisma from "@/lib/db";

export default function Home() {


  async function addUnit() {
    "use server"

    const tags = [
        { title: 'أكلات سريعة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'مقرونة', seoTitle: '', description: 'عشاق المكرونة والارز يا حلاوة تضع على ذمتكم وصفاتها مرفقة بفيديو لطريقة التحضير والمقادير', seoDescription: '', status: 'Active' },
        { title: 'صحي', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'معجنات', seoTitle: '', description: 'لكل عشاق الخبز، البيتزا والتارت المالحة، جميع هذه الوصفات مرفقة بفيديو لطريقة التحضير والمقادير متوفرة من يا حلاوة', seoDescription: '', status: 'Active' },
        { title: 'لحم', seoTitle: '', description: 'لكل عشاق الحوم و الدواجن والسمك، جميع هذه الوصفات مرفقة بفيديو لطريقة التحضير والمقادير متوفرة من يا حلاوة', seoDescription: '', status: 'Active' },
        { title: 'بسكويت', seoTitle: 'بسكويت جاف', description: 'لكل عشاق الكوكيز والبسكويت الجاف يا حلاوة تضع على ذمتكم وصفات سهلة ومرفقة بفيديو خطوة بخطوة', seoDescription: '', status: 'Active' },
        { title: 'حلويات', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'قاطو', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'نصائح عامة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'نصائح حلويات', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'نصائح غذائية', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'نصائح طبخ', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'كايك', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'تشيز كايك', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'سلاطة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'صيف', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'شتاء', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'ربيع', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'خريف', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'شربة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'رمضان', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'عيد الفطر', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'عيد الاضحى', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'تارت حلوة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'تارت مالحة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'كيش-تارت مالحة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'طاجين-كايك مالح', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'بيتزا', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'دجاج', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'حوت', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'بالجبن', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'خبز', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'مقبلات', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'في الفور', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'من غير طبخ', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'ساندويش', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'بالشكلاطة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'بارد', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'مالح', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'من غير لحوم', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'بالغلال', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'خضرة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'للأطفال', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'كايك مالح', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'طبق رئيسي', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'أقل من 30 دقيقة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'براونيز', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'كاب كايك', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'عصيدة-بوزة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'مشروبات-عصير', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'من غير فور', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'طبخ', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'كايك حلو', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'حلويات أقل من 30 دقيقة', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'نصائح حفظ', seoTitle: '', description: '', seoDescription: '', status: 'Active' },
        { title: 'نصائح تنظيف', seoTitle: '', description: '', seoDescription: '', status: 'Active' }      
 
  ];

  

    try {
      const result = await prisma.category.createMany({
        data : tags
      })
      // const result = await prisma.origine.deleteMany({})
    
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
