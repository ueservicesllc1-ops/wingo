import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-[#1A2C38] text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-green-400">
            SPORTBET
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm">
            <Link href="#" className="text-gray-300 hover:text-white bg-green-500 px-3 py-1 rounded-md">Promociones</Link>
            <Link href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
              <Flame className="h-4 w-4 text-red-500" />
              En vivo
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">Resultados en vivo</Link>
            <Link href="#" className="text-gray-300 hover:text-white">Estadisticas</Link>
            <Link href="#" className="text-gray-300 hover:text-white">Reglas</Link>
            <Link href="#" className="text-gray-300 hover:text-white">Noticias</Link>
            <Link href="#" className="text-gray-300 hover:text-white">Agencias</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" className="bg-green-500 text-white hover:bg-green-600 border-none">REGISTRATE</Button>
          <Button variant="outline" className="bg-gray-700 hover:bg-gray-600 border-gray-600">INGRESAR</Button>
          <div className="relative">
            <select className="bg-gray-800 text-white rounded-md p-2 appearance-none">
              <option>ES</option>
              <option>EN</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
