import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, duration, start, timeZone } = body;

    if (!name || !email || !duration || !start) {
      return NextResponse.json({ error: "Missing required booking details." }, { status: 400 });
    }

    const apiKey = process.env.CAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Booking system is not configured." }, { status: 500 });
    }

    const eventTypeId = duration === "15min" 
      ? process.env.CAL_EVENT_TYPE_15MIN 
      : process.env.CAL_EVENT_TYPE_30MIN;

    if (!eventTypeId) {
      return NextResponse.json({ error: "Invalid meeting duration." }, { status: 400 });
    }

    const startDate = new Date(start);
    if (isNaN(startDate.getTime())) {
       return NextResponse.json({ error: `Invalid date format received: ${start}` }, { status: 400 });
    }

    // Calculate end time in UTC
    const durationMins = duration === "15min" ? 15 : 30;
    const endDate = new Date(startDate.getTime() + durationMins * 60000);

    const bookingPayload = {
      eventTypeId: parseInt(eventTypeId, 10),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      responses: {
        name: name,
        email: email,
        location: {
          value: "integrations:daily",
          optionValue: ""
        }
      },
      metadata: {},
      timeZone: timeZone || "Africa/Lagos",
      language: "en"
    };

    // Call Cal.com API v1
    const res = await fetch(`https://api.cal.com/v1/bookings?apiKey=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingPayload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Cal.com Booking Error:", data);
      return NextResponse.json({ error: data.message || "Failed to confirm booking with Cal.com. The time slot might be unavailable." }, { status: res.status });
    }

    return NextResponse.json({ message: `✅ **Booking Confirmed!** A calendar invite has been sent to ${email}.` });
  } catch (err: any) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "An unexpected error occurred while booking." }, { status: 500 });
  }
}
