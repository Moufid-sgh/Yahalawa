

import Button from "@/components/Button";
import prisma from "@/lib/db";

export default function Home() {


  async function addUnit() {
    "use server"

    const tags = [
        { title: 'للعائلة', status: 'Active' },
        { title: 'عيد الاضحى', status: 'Active' },
        { title: 'وصفات رومانسية', status: 'Active' },
        { title: 'طبق رئيسي ', status: 'Active' },
        { title: 'مقبلات', status: 'Active' },
        { title: 'لحم ', status: 'Active' },
        { title: 'دجاج ', status: 'Active' },
        { title: 'سمك ', status: 'Active' },
        { title: 'أكلات سهلة ', status: 'Inactive' },
        { title: 'بدون لحم ', status: 'Active' },
        { title: 'للأطفال', status: 'Active' },
        { title: 'وجبة فطورالصباح ', status: 'Inactive' },
        { title: ' صحي و دايت ', status: 'Inactive' },
        { title: 'وصفات حصرية', status: 'Inactive' },
        { title: 'نباتي', status: 'Inactive' },
        { title: 'شكلاطة ', status: 'Active' },
        { title: ' حار', status: 'Inactive' },
        { title: 'جبن', status: 'Active' },
        { title: 'بدون بيض', status: 'Active' },
        { title: 'بدون غليتين ', status: 'Active' },
        { title: 'حلويات', status: 'Inactive' },
        { title: 'كايك مالح ', status: 'Active' },
        { title: 'بيتزا', status: 'Active' },
        { title: 'خبز ', status: 'Active' },
        { title: 'تارت مالحة ', status: 'Active' },
        { title: 'تارت حلوة ', status: 'Active' },
        { title: 'ساندويش', status: 'Active' },
        { title: 'بدون سكر ', status: 'Active' },
        { title: 'سلطة', status: 'Active' },
        { title: 'وجبة العشاء ', status: 'Inactive' },
        { title: 'طبق رئيسي', status: 'Active' },
        { title: 'مالح', status: 'Active' },
        { title: 'شربة', status: 'Active' },
        { title: 'حساء ', status: 'Inactive' },
        { title: 'في الفور', status: 'Active' },
        { title: 'مقرونة', status: 'Inactive' },
        { title: 'عيد الميلاد', status: 'Inactive' },
        { title: 'عيد الفطر', status: 'Active' },
        { title: 'راس السنة', status: 'Active' },
        { title: 'غلال ', status: 'Active' },
        { title: 'خضر', status: 'Active' },
        { title: 'تشيز كايك', status: 'Active' },
        { title: 'بسكويت جاف', status: 'Active' },
        { title: 'صلصة ', status: 'Active' },
        { title: 'اقل من 30 دقيقة', status: 'Active' },
        { title: 'كريمة ', status: 'Active' },
        { title: 'كوكيز ', status: 'Active' },
        { title: 'براونيز', status: 'Active' },
        { title: 'وصفة غير مكلفة ', status: 'Active' },
        { title: 'صحي ', status: 'Active' },
        { title: 'مشروبات ', status: 'Active' },
        { title: 'وجبات خفيفة', status: 'Inactive' },
        { title: 'بدون فور', status: 'Active' },
        { title: 'بدون طهي ', status: 'Inactive' },
        { title: 'أقل سعرات حرارية ', status: 'Inactive' },
        { title: 'وجبة سهلة ', status: 'Inactive' },
        { title: 'وصفات للشتاء ', status: 'Inactive' },
        { title: 'الرجيم ', status: 'Inactive' },
        { title: 'رمضان', status: 'Active' },
        { title: 'الأكل الجيد ', status: 'Inactive' },
        { title: 'الفوائد الصحية', status: 'Inactive' },
        { title: 'مواد غذائية', status: 'Inactive' },
        { title: 'وصفات العودة إلى المدرسة ', status: 'Inactive' },
        { title: 'التقشير ', status: 'Active' },
        { title: 'بدون طبخ ', status: 'Active' },
        { title: 'كايك حلو ', status: 'Active' },
        { title: 'كيش', status: 'Active' },
        { title: 'طاجين', status: 'Active' },
        { title: 'معجنات', status: 'Active' },
        { title: 'المولد النبوي', status: 'Active' },
        { title: 'خريف', status: 'Active' },
        { title: 'ربيع', status: 'Active' },
        { title: 'شتاء', status: 'Active' },
        { title: 'صيف', status: 'Active' },
        { title: 'قاطو', status: 'Active' },
        { title: 'كراب', status: 'Active' },
        { title: 'فلان', status: 'Active' },
        { title: 'بدون زبدة ', status: 'Active' },
        { title: 'لوز', status: 'Active' },
        { title: 'فستق', status: 'Active' },
        { title: 'كاكاوية', status: 'Active' },
        { title: 'فواكه جافة', status: 'Active' },
        { title: 'من غير حليب', status: 'Active' }  
    ];
  

    try {
      const result = await prisma.tags.createMany({
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
