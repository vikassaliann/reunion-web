import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Format the message for WhatsApp
    const message = `Hello Reunion Global! I would like to inquire about your estates.
    
*Name*: ${data.name}
*Email*: ${data.email}
*Preference*: ${data.preference}`;

    // Target WhatsApp Number
    const whatsappNumber = process.env.WHATSAPP_NUMBER || "919980208289";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json({ url: whatsappUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
