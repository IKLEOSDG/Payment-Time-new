"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 p-10 sm:p-0">
      {/* Left side */}
      <Image src="/services.png" alt="preview" width={519} height={472} />

      {/* Right side */}
      <div className="text-center xl:text-left">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">Services</span> with easy way
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use Pay-now to easily keep track of Services. Get Services for AU$100.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild onClick={toggleSidebar}>
            <span>Checkout</span>
          </Button>
          <Button asChild variant="secondary">
            <Link href="login">pay</Link>
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-4">
          <button onClick={toggleSidebar} className="text-gray-600 text-xl">&times;</button>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center py-2">
            <div>Services *1</div>
            <div>$100</div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold py-2">
            <div>TOTAL</div>
            <div>$100</div>
          </div>
          
        </div>
      )}
    </main>
  );
}
