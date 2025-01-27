import { NextResponse } from "next/server";
import { createClient } from "@/app/utils";

/**
 * Get the total number of issues
 * @returns JSON response with message and count
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("issues")
      .select("", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched issue count",
      response: count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
