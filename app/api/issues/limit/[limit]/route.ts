import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ limit: string }> }
) {
  try {
    const supabase = await createClient();
    const { limit } = await params;
    if (!limit) {
      throw new Error("The limit is undefined");
    }
    const MIN = Number(limit) * 5 - 5;
    const MAX = MIN + 4;
    const { data, error } = await supabase
      .from("issues")
      .select(
        "id, description, address, created_at, issue_statuses(name), issue_types(name)"
      )
      .range(MIN, MAX)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched ${limit} jobs`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
