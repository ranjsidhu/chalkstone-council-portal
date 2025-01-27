import React from "react";
import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { AUTH_STORAGE_KEY } from "@/app/constants";
import { LOGIN_MODAL_CONFIG } from "@/test_configs";

const MOCK_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_MOCK_USERNAME,
  password: process.env.NEXT_PUBLIC_MOCK_PASSWORD,
};

type LoginModalProps = {
  isOpen: boolean;
  onClose: any;
  onLoginSuccess: any;
};

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const resetModal = () => {
    setUsername("");
    setPassword("");
  };

  /**
   * Handles the submission of the login form.
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Basic credential check
      if (
        username === MOCK_CREDENTIALS.username &&
        password === MOCK_CREDENTIALS.password
      ) {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
        // Prevent entered details being used without permission when an authenticated user logs out
        resetModal();
        onLoginSuccess();
        onClose();
      } else {
        setError("Invalid username or password");
      }
    } catch (err: any) {
      setError("An error occurred. Please try again. " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid={LOGIN_MODAL_CONFIG.container}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          data-testid={LOGIN_MODAL_CONFIG.closeButton}
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Login</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter your credentials to access the admin area.
          </p>
        </div>

        <form
          data-testid={LOGIN_MODAL_CONFIG.form}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {error && (
            <div
              data-testid={LOGIN_MODAL_CONFIG.error}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              data-testid={LOGIN_MODAL_CONFIG.username}
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              data-testid={LOGIN_MODAL_CONFIG.password}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end">
            <button
              data-testid={LOGIN_MODAL_CONFIG.submitButton}
              type="submit"
              disabled={isLoading}
              className={`
                px-4 py-2 rounded-md text-white font-medium
                ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
