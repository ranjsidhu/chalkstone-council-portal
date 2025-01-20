import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("issues")
      .select(
        "id, description, address, created_at, issue_statuses(name), issue_types(name)"
      );
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
    const insertData = {
      lat: body.position[0],
      long: body.position[1],
      issue_type_id: body.issue.id,
      description: body.description,
      address: body.address,
      image_filename: body.image_filename,
    };
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("issues")
      .insert([insertData])
      .select();
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
    const { id, status_name } = body;
    delete body.id;
    delete body.status_name;
    if (status_name === "Closed") {
      delete body.resolved_at;
    }
    const supabase = await createClient();
    const { data, error: updateError } = await supabase
      .from("issues")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();
    if (updateError) throw new Error(updateError.message);

    const { error: resolvedError } = await supabase
      .from("staff_issues")
      .update({ is_resolved: status_name === "Resolved" })
      .eq("issue_id", id);
    if (resolvedError) throw new Error(resolvedError.message);

    return NextResponse.json(
      {
        message: "Issue updated successfully",
        response: { ...data },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
