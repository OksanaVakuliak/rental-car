import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { GetBrandsResponse } from "@/types/car";
import api from "../api";
import { logErrorResponse } from "../utils";

export async function GET() {
  try {
    const { data } = await api.get<GetBrandsResponse>("/brands");
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
