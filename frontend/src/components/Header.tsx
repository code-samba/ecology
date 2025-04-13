"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme/ModeToggle";
import { Separator } from "./ui/separator";

export default function Header() {
  const pathname = usePathname();

  const HeaderRedirects = [
    {
      name: "Overview",
      href: "/",
    },
    {
      name: "Analytics",
      href: "/analytics",
    },
  ];

  return (
    <>
      <div className="flex py-3 px-6 gap-3 justify-between items-center">
        <div className="flex gap-6 items-center">
          <p className="font-bold text-lg">Ecology</p>
          <div className="flex gap-4 text-sm">
            {HeaderRedirects.map((value, index) => {
              const isActive = pathname === value.href;

              return (
                <a
                  key={index}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  href={value.href}
                >
                  {value.name}
                </a>
              );
            })}
          </div>
        </div>
        <ModeToggle />
      </div>
      <Separator />
    </>
  );
}
