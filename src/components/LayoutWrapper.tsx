"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="bg-[#0A0E1A] min-h-screen text-white">{children}</div>;
  }

  return (
    <div className="bg-[#0A0E1A] min-h-screen text-white flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
