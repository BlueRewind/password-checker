import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const password = formData.get('password');
    console.log('Received Password:', password);

    // TODO: Uncomment this if you want to see the next response without looking in the network tab
    // return NextResponse.json({ message: 'Password received!' }); // Respond with a success message
}