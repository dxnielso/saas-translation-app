import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import MainTitle from "@/components/MainTitle";
import MainParagraph from "@/components/MainParagraph";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* hero */}
      <div className="py-20 px-8 xl:px-0 max-w-6xl mx-auto">
        <MainTitle text="Chatea con quien sea, donde sea!" />
        <MainParagraph
          text="Tu hablas en tu idioma, ellos hablan en su idioma."
          highlight="Deja la IA hacer el trabajo."
        />
        {/* buttons */}
        <div className="flex justify-center items-center gap-x-6">
          <Link
            href="/chat"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/60 duration-200"
          >
            Empezar
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 flex justify-center items-center gap-x-2 duration-200 hover:opacity-85"
          >
            Ver Precios
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* gif */}
      <div className="bg-gray-50 dark:bg-gray-900"></div>
    </main>
  );
}

export default Home;
