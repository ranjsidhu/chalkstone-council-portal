import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

const { NEXT_PUBLIC_IMAGE_BUCKET } = process.env;

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.formData();
    const filename = body.get("filename") as string;
    const image = body.get("image") as Blob;

    const { error } = await supabase.storage
      .from(NEXT_PUBLIC_IMAGE_BUCKET!)
      .upload(filename, image);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "File uploaded sucessfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "File upload failed", error: error.message },
      { status: 500 }
    );
  }
}
