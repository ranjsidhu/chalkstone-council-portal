"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Settings } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const buttonClass =
    "flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md";

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Chalkstone Council
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                className={buttonClass}
                onClick={() => router.push("/admin")}
              >
                <Settings className="w-5 h-5" />
                Admin
              </button>
              <button
                className={buttonClass}
                onClick={() => {
                  setIsLoggedIn(false);
                  router.push("/");
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className={buttonClass}>
              <LogIn className="w-5 h-5" />
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
