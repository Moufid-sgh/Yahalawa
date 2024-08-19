import Navbar from "@/components/home/Navbar";
import SearchBarHome from "@/components/home/SearchBarHome";


export default function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-8">
      
      <header>
        <Navbar />
        <SearchBarHome />
      </header>

      <div>
        <p className="bg-darkblue w-48 h-0.5"></p>
      </div>

    </main>
  );
}





