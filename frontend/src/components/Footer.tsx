import Link from "next/link";

export default function Footer() {
  return (
      <footer className="flex flex-col items-center w-full justify-center px-5 py-4 gap-3 md:flex-row">
          <span className="text-xs md:text-sm">Copyright © {new Date().getFullYear()} <Link href="https://sambacode.com.br" className="transition hover:text-primary">Samba Code</Link> – Todos os direitos reservados.</span>
      </footer>
  )
}