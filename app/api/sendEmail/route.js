// import { Resend } from "resend";
 
// import { NextResponse } from "next/server";
// import EmailTemplate from "@/emails/my-email";
// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const response = await req.json();

//   const data = await resend.emails.send({
//     from: "doctor@gmail.com",
//     to: [response.data.Email],
//     subject: "Appoinment Confirmation",
//     react: EmailTemplate({
//       response,
//     }),
//   });
//   try {
//     return NextResponse.json({ data });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error });
//   }
// }
import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/emails/my-email";
const resend = new Resend('re_iFBAbhCS_GAaWh4sGzjR3VGX5YLawpz4y');

export async function POST(req) {
  try {
    // Parsing the incoming JSON request
    const response = await req.json();
    
    // Ensure that the response has the necessary data
    const emailData = response?.data;
    if (!emailData?.Email) {
      return NextResponse.json({ error: "Email address is missing in the request" }, { status: 400 });
    }

    // Sending email using Resend API
    const emailResponse = await resend.emails.send({
      from: "maboukila55@gmail.com", // Replace with your own email
      to: [response.data.Email],
      subject: "Appointment Confirmation",
      react: EmailTemplate({
        response, // Pass response data to the email template
      }),
    });

    console.log("Email sent successfully:", emailResponse); // Log the email response for debugging

    return NextResponse.json({ data: emailResponse }); // Return success response
  } catch (error) {
    console.error("Error sending email:", error); // Log the error
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
