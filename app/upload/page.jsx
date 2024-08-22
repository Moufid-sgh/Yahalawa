
import Button from "@/components/Button";
import prisma from "@/lib/db";
import { tipsData } from "../tables/tips";
import { categoryTips } from "../tables/category_tips";

import { recipes } from "../tables/recipes";
import { categoryRecipesSelected } from "../tables/recipe_category";
import { recipeIngredient } from "../tables/recipe_ingredient";
import { steps } from "../tables/recipe_steps";

export default function Home() {


  async function addUnit() {
    "use server"


    const tags = [
      { title: 'نصائح طبخ' },
      { title: 'نصائح حلويات' },
      { title: 'نصائح حفظ' },
      { title: 'نصائح غذائية' },
      { title: 'نصائح تنظيف' },
      { title: 'نصائح عامة' },
      { title: 'نصائح هالثي' },
    ];


    try {

      // for (const tip of tipsData) {
      //   await prisma.tips.create({
      //     data: {
      //       id: tip.id,
      //       title: tip.title,
      //       seoTitle: tip.seoTitle,
      //       description: tip.description,
      //       seoDescription: tip.seoDescription,
      //       category: {
      //         create: tip.category.map((el) => ({
      //           title: el,
      //         })),
      //       },
      //       slug: tip.slug,
      //       author: tip.author,
      //       img: tip.img,
      //       featured: tip.featured,
      //       status: tip.status,
      //       createdAt: tip.createdAt,
      //       updatedAt: tip.updatedAt,
      //       is_paying: tip.is_paying,
      //       likes: tip.likes,
      //       note: tip.note,
      //       // scheduled_publish_date 
      //       id_intern: tip.id_intern,
      //       video_link: tip.video_link,
      //     },
      //     include: {
      //       category: true
      //     }
      //   })
      // }



    const result = await prisma.recipeSteps.createMany({ data : steps })

    // const result = await prisma.recipeSteps.deleteMany({})


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





