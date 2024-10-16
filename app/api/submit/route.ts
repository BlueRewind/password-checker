import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData(); // Parse the form data
    const password = formData.get('password'); // Get the password
  
    console.log('Received Password:', password); // Log the received password
  
    // Perform any necessary server-side processing here (e.g., validation, storage)
  
    // return NextResponse.json({ message: 'Password received!' }); // Respond with a success message
}