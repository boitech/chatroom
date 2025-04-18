"use client";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginWithGoogle = () => {
    setLoading(true);
    const supabase = supabaseClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://chatroom-nauh.onrender.com/auth/callback",
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          🔐 Login using Google
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col gap-6">
          {loading ? (
            <Button disabled>
              Logging In
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            </Button>
          ) : (
            <Button onClick={handleLoginWithGoogle}>
              <Image
                src="/icons/google.svg"
                alt="Google Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Google
            </Button>
          )}
        </div>
        <p className="mt-10 text-center">
          Go back to{" "}
          <Link
            href="/"
            className="font-semibold leading-6 text-primary hover:text-popover-foreground"
          >
            Home
          </Link>{" "}
          🏠🤝
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
