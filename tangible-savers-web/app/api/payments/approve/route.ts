import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { paymentId } = await request.json();
  const PI_API_KEY = process.env.PI_API_KEY;

  if (!paymentId) {
    return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
  }

  if (!PI_API_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );

    return NextResponse.json({ message: 'Approved', paymentId }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Approval Failed', details: errorMessage }, { status: 500 });
  }
}
