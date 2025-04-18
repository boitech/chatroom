import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (!code) {
      console.error("No code in URL");
      return NextResponse.redirect("/auth/auth-code-error");
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("exchangeCodeForSession result:", data, error);

    if (error) {
      console.error("Supabase exchange error:", error.message);
      return NextResponse.redirect("/auth/auth-code-error");
    }

    return NextResponse.redirect(next);
  } catch (err: any) {
    console.error("Unhandled /auth/callback error:", err.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
