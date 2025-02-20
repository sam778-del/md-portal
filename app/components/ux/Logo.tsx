import Image from "next/image";
import React from "react";

export function Logo() {
  return (
    <div className="flex justify-center">
      <Image
        src="/logo.png" 
        alt="Logo"
        width={243} 
        height={60}
        priority 
      />
    </div>
  );
}
