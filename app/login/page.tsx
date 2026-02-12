"use client";

import type React from "react";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { GoogleIcon } from "./CustomIcons";
import MuiButton from "@mui/material/Button";
import { signInWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"user" | "pro">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /* SESSION CHECK */
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/home");
      }
    };

    checkSession();
  }, [router]);

  /* LOGIN */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Replace with your real backend login
      router.replace(activeTab === "pro" ? "/pro/home" : "/home");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1426] flex items-center justify-center px-4">

      <Card className="bg-[#111C33] border border-[#1F2A44] shadow-2xl rounded-3xl w-full max-w-md">

        <CardHeader className="space-y-6 p-6">

          {/* TOGGLE */}
          <div className="relative flex bg-[#0B1426] p-1 rounded-full overflow-hidden">
            
            <span
              className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ${
                activeTab === "user"
                  ? "left-1 bg-[#007BFF]"
                  : "left-[50%] bg-gradient-to-r from-purple-600 to-indigo-600"
              }`}
            />

            <button
              type="button"
              onClick={() => setActiveTab("user")}
              className="relative z-10 w-1/2 py-2 text-sm font-medium text-white"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pro")}
              className="relative z-10 w-1/2 py-2 text-sm font-medium text-white"
            >
              Sign for Professional
            </button>
          </div>

          {/* HEADER TEXT */}
          <div className="space-y-2">
            {activeTab === "pro" && (
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-blue-600/20 text-purple-400 border border-purple-500/30">
                <ShieldCheck size={14} />
                Verified Professional Access
              </div>
            )}

            <CardTitle className="text-2xl text-white">
              {activeTab === "user"
                ? "Welcome Back"
                : "Professional Portal Login"}
            </CardTitle>

            <CardDescription className="text-gray-400">
              {activeTab === "user"
                ? "Sign in to manage your bookings and services"
                : "Access your professional dashboard and manage clients"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form className="space-y-5" onSubmit={handleLogin} noValidate>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-12 rounded-xl bg-[#0B1426] border-[#1F2A44] text-white"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label className="text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-12 rounded-xl bg-[#0B1426] border-[#1F2A44] text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-xl transition ${
                activeTab === "user"
                  ? "bg-[#007BFF] hover:bg-blue-600"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : activeTab === "user" ? (
                "Sign In"
              ) : (
                "Access Professional Dashboard"
              )}
            </Button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1F2A44]" />
              <span className="text-sm text-gray-400">or sign with</span>
              <div className="flex-1 h-px bg-[#1F2A44]" />
            </div>

            {/* GOOGLE */}
            <MuiButton
              fullWidth
              variant="contained"
              disabled={isGoogleLoading}
              startIcon={
                isGoogleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon />
                )
              }
              onClick={async () => {
                try {
                  setIsGoogleLoading(true);
                  await signInWithGoogle();
                } catch {
                  setError("Google sign-in failed");
                  setIsGoogleLoading(false);
                }
              }}
              sx={{
                backgroundColor: "#1F6FEB",
                fontWeight: "bold",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "#388BFD",
                },
              }}
            >
              {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
            </MuiButton>

            <div className="text-sm text-gray-400 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/createAccount" className="text-[#007BFF]">
                Create account
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </main>
  );
}