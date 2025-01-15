import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("issues").select();
    console.log("🚀 ~ GET ~ data:", data);
    if (error) throw new Error(error.message);
    return NextResponse.json(
      { response: data, message: "Issues fetched successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);
    const supabase = await createClient();
    const { data, error } = await supabase.from("issues").insert([body]);
    console.log("🚀 ~ POST ~ data:", data);
    if (error) throw new Error(error.message);
    return NextResponse.json(
      { response: data, message: "Issue created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("issues")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return NextResponse.json(
      {
        message: "Issue updated successfully",
        response: { ...data },
      },
      { status: 204 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
