import { NextResponse } from "next/server"
import { mockDematAccounts } from "@/lib/mock-data"

export async function GET(request: Request) {
  // In a real app, this would fetch data from a database
  return NextResponse.json(mockDematAccounts)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, this would validate and save to a database
    const newAccount = {
      id: `demat${mockDematAccounts.length + 1}`,
      ...body,
      connectedOn: new Date().toISOString(),
    }

    return NextResponse.json(newAccount, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create demat account" }, { status: 500 })
  }
}

