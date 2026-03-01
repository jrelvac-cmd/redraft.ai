export const dynamic = "force-dynamic";

export async function GET() {
  // Workaround for Next.js 16 Turbopack env var bug in dev mode
  // These values should be loaded from process.env but aren't working
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dubndjbtedoizxcnicys.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Ym5kamJ0ZWRvaXp4Y25pY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzcwOTAsImV4cCI6MjA4Nzg1MzA5MH0.DIir2lw6H09wUe4QqTdwQgY8oShONupSUioWUXrCm9g";
  
  console.log("[API /config] URL:", url ? "set" : "missing");
  console.log("[API /config] KEY:", key ? "set" : "missing");

  return Response.json({
    NEXT_PUBLIC_SUPABASE_URL: url,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: key,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  });
}

