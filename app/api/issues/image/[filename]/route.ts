import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

const { NEXT_PUBLIC_IMAGE_BUCKET } = process.env;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) throw new Error("No filename provided");
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from(NEXT_PUBLIC_IMAGE_BUCKET!)
      .download(filename);

    if (error) throw new Error(error.message);

    const fileBuffer = await data.arrayBuffer();
    const contentType = data.type || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer!.byteLength.toString(),
      },
    });
  } catch (error: any) {
    return { error: error.message };
  }
}
