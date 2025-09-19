import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function AppFooter() {
  return (
    <footer className="bg-[#101921] text-gray-400 text-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
                <Image src="https://picsum.photos/seed/chat/40/40" alt="Chat Icon" width={40} height={40} className="rounded-full" data-ai-hint="chat icon" />
                <div className="flex space-x-2">
                    <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"><Facebook className="h-5 w-5" /></Link>
                    <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"><Instagram className="h-5 w-5" /></Link>
                    <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"><Youtube className="h-5 w-5" /></Link>
                </div>
            </div>
            <div className="flex-grow text-center">
                <div className="grid grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-white mb-2">INFORMACION GENERAL</h3>
                        <ul className="space-y-1">
                            <li><Link href="#" className="hover:text-white">REGLAMENTO</Link></li>
                            <li><Link href="#" className="hover:text-white">REGLAMENTO DE TENIS</Link></li>
                            <li><Link href="#" className="hover:text-white">REGLAMENTO E-SPORTS</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2">DEPORTE</h3>
                        <ul className="space-y-1">
                            <li><Link href="#" className="hover:text-white">RESULTADOS</Link></li>
                            <li><Link href="#" className="hover:text-white">ESTADISTICAS</Link></li>
                            <li><Link href="#" className="hover:text-white">CENTRO EN VIVO</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2">OBTEN TU FRANQUICIA</h3>
                        <ul className="space-y-1">
                            <li><Link href="#" className="hover:text-white">AFILIADOS</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2">RACEBOOK</h3>
                        <ul className="space-y-1">
                            <li><Link href="#" className="hover:text-white">REGLAS DE CARRERAS</Link></li>
                            <li><Link href="#" className="hover:text-white">TIPOS DE APUESTAS</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <button className="flex items-center space-x-2">
                <span>ESPAÑOL</span>
                <span className="text-xs">▼</span>
              </button>
            </div>
        </div>
      </div>
      <div className="bg-black py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-gray-500">Copyright © 2024. All Rights Reserved.</div>
          <Image src="https://picsum.photos/seed/footer-logo/200/30" alt="Logos" width={200} height={30} data-ai-hint="gaming logos" />
        </div>
      </div>
    </footer>
  );
}