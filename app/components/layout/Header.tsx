"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogIn, Settings } from "lucide-react";
import LoginModal from "./LoginModal";
import { AUTH_STORAGE_KEY } from "@/app/constants";
import { HEADER_CONFIG } from "@/test_configs";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(authStatus === "true");
    if (
      (pathname.startsWith("/admin") && !authStatus) ||
      authStatus !== "true"
    ) {
      router.push("/");
    }
  }, [pathname, router]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
    router.push("/");
  };

  const buttonClass =
    "flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md";

  return (
    <>
      <header
        data-testid={HEADER_CONFIG.container}
        className="w-full bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900"
              data-testid={HEADER_CONFIG.logo}
            >
              Chalkstone Council
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button
                  data-testid={HEADER_CONFIG.adminButton}
                  className={buttonClass}
                  onClick={() => router.push("/admin")}
                >
                  <Settings className="w-5 h-5" />
                  Admin
                </button>
                <button
                  data-testid={HEADER_CONFIG.signOutButton}
                  className={buttonClass}
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                data-testid={HEADER_CONFIG.logInButton}
                onClick={() => setIsLoginModalOpen(true)}
                className={buttonClass}
              >
                <LogIn className="w-5 h-5" />
                Log In
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
