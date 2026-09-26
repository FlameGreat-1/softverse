import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const q = searchParams.get("q");

    let url = "";

    if (lat && lon) {
      url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    } else if (q) {
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;
    } else {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "FlamoProjectApp/1.0 (Contact: flamo@flamegreat.tech)",
        "Accept": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Nominatim API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Geocode Proxy Error:", error);
    return NextResponse.json({ error: "Failed to fetch geolocation data" }, { status: 500 });
  }
}
