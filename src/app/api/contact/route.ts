import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, service, budget, message } = await req.json()
    
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing.')
      return NextResponse.json({ error: 'Configuration error: Mail service not configured' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'security@khalidsanawer.online',
      subject: `New Inquiry: ${service} — ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
