import { NextRequest, NextResponse } from "next/server";
import { GetCarsResponse } from "@/types/car";
import api from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const { data } = await api.get<GetCarsResponse>("/cars", {
      params: Object.fromEntries(searchParams.entries()),
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, details: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
