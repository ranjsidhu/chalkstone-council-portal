import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

/**
 * Get an issue by id
 * @param req NextRequest
 * @param params Promise<{ id: string }>
 * @returns JSON response with message and issue data
 */
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
    const { data: issueData, error: issueError } = await supabase
      .from("issues")
      .select(
        "*, issue_statuses(name), issue_types(name), staff_issues(staff(id, name))"
      )
      .eq("id", id);
    if (issueError) throw new Error(issueError.message);

    if (!issueData[0].image_filename) {
      // If there's no image, just return the issue data
      return NextResponse.json({
        message: `Successfully fetched issue data`,
        response: issueData,
      });
    }

    const { data: publicUrl } = supabase.storage
      .from(process.env.NEXT_PUBLIC_IMAGE_BUCKET!)
      .getPublicUrl(issueData[0].image_filename);

    return NextResponse.json({
      message: `Successfully fetched issue data`,
      response: {
        ...issueData,
        image: publicUrl.publicUrl,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
