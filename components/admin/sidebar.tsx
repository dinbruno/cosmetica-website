"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Home, Users, MessageSquare, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { href: "/admin", label: "Contatos", icon: MessageSquare },
  { href: "/admin/professionals", label: "Profissionais", icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-20 items-center justify-center border-b px-6">
        <Link href="/admin">
          <Image src="/images/logo-cosmetica.avif" alt="Cosmética Logo" width={150} height={45} />
        </Link>
      </div>
      <nav className="flex flex-grow flex-col gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-primary/10 hover:text-primary",
              pathname === item.href && "bg-primary/10 font-semibold text-primary",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
        <div className="mt-auto">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
            Ver Site Público
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 mt-2" onClick={() => signOut(auth)}>
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </div>
      </nav>
    </aside>
  )
}
