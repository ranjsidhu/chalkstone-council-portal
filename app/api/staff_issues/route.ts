import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function POST(request: NextRequest) {
  const { staff_id, issue_id } = await request.json();

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("staff_issues")
      .insert([{ staff_id, issue_id }]);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Staff assigned to issue successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
