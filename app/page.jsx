import Navbar from "@/components/home/Navbar";
import SearchBarHome from "@/components/home/SearchBarHome";


export default function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center px-32 py-8">
      
      
      <header className="w-full">
        <Navbar />
        <SearchBarHome />
      </header>

      <div className="flex items-center w-full mt-16">
        <p className="bg-darkblue w-full h-[1px]"></p>
        <h1 className="text-blueTitle text-3xl mx-24 whitespace-nowrap">جديدنا اليوم</h1>
        <p className="bg-darkblue w-full h-[1px]"></p>
      </div>

    </main>
  );
}





