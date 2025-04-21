import { NextResponse } from "next/server"
import { mockAlerts } from "@/lib/mock-data"

export async function GET(request: Request) {
  // In a real app, this would fetch data from a database
  return NextResponse.json(mockAlerts)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, this would validate and save to a database
    const newAlert = {
      id: `alert${mockAlerts.length + 1}`,
      ...body,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newAlert, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}

