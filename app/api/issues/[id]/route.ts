import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    if (!id) {
      throw new Error("The id is undefined");
    }
    const { data, error } = await supabase
      .from("issues")
      .select("*, issue_statuses(name), issue_types(name)")
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched application status`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
