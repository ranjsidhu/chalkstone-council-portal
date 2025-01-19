// app/api/issues/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");
    const itemsPerPage = 5;

    const supabase = await createClient();

    // First, if we have filters, get the IDs
    let statusId: number | null = null;
    let typeId: number | null = null;

    if (status) {
      const { data: statusData } = await supabase
        .from("issue_statuses")
        .select("id")
        .eq("name", status)
        .single();

      if (statusData) {
        statusId = statusData.id;
      }
    }

    if (type) {
      const { data: typeData } = await supabase
        .from("issue_types")
        .select("id")
        .eq("name", type)
        .single();

      if (typeData) {
        typeId = typeData.id;
      }
    }

    // Now build the main query
    let query = supabase.from("issues").select(`
        *,
        issue_statuses (
          id,
          name
        ),
        issue_types (
          id,
          name
        )
      `);

    // Apply filters using the foreign key IDs
    if (statusId) {
      query = query.eq("status_id", statusId);
    }

    if (typeId) {
      query = query.eq("issue_type_id", typeId);
    }

    // Build base query for count
    let countQuery = supabase
      .from("issues")
      .select("*", { count: "exact", head: true });

    // Apply filters to count query
    if (statusId) {
      countQuery = countQuery.eq("status_id", statusId);
    }
    if (typeId) {
      countQuery = countQuery.eq("issue_type_id", typeId);
    }

    // Get total count with filters
    const { count, error: countError } = await countQuery;

    if (countError) {
      throw countError;
    }

    // Add pagination
    const start = (page - 1) * itemsPerPage;
    query = query
      .range(start, start + itemsPerPage - 1)
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { response: [], error: error.message, totalCount: count || 0 },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: data || [], totalCount: count || 0 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { response: [], error: error.message, totalCount: 0 },
      { status: 500 }
    );
  }
}
