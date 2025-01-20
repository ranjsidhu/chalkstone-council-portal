import { NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("staff").select();
    if (error) throw new Error(error.message);
    return NextResponse.json(
      {
        response: data,
        message: "Staff fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
