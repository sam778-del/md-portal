import Image from "next/image";
import React from "react";

export function SuccessIcon() {
  return (
    <div className="flex justify-center">
      <Image
        src="/success.png" 
        alt="Logo"
        width={543} 
        height={60}
        priority 
      />
    </div>
  );
}
