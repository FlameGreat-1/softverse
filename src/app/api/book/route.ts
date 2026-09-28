import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, duration, date, time } = body;

    if (!name || !email || !duration || !date || !time) {
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

    // Parse date and time in Africa/Lagos timezone and convert to ISO string
    // Format: YYYY-MM-DDTHH:MM:00.000Z
    // Because we need the exact start time in UTC, and Lagos is UTC+1.
    // A simple way is to create a Date object.
    
    // Construct local time string in Lagos
    const localDateTimeStr = `${date}T${time}:00+01:00`; 
    const startDate = new Date(localDateTimeStr);
    
    if (isNaN(startDate.getTime())) {
       return NextResponse.json({ error: "Invalid date or time format." }, { status: 400 });
    }

    // Calculate end time
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
      timeZone: "Africa/Lagos",
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
