import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    // Prepare email content
    const emailContent: sgMail.MailDataRequired = {
      to: process.env.CONTACT_FORM_TO_EMAIL || '', // Your email address
      from: process.env.CONTACT_FORM_FROM_EMAIL || '', // Verified sender email
      subject: `New Contact Form Submission from ${formData.get('name')}`,
      text: `
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Project Type: ${formData.get('projectType')}
Budget Range: ${formData.get('budget')}

Project Description:
${formData.get('message')}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${formData.get('name')}</p>
<p><strong>Email:</strong> ${formData.get('email')}</p>
<p><strong>Project Type:</strong> ${formData.get('projectType')}</p>
<p><strong>Budget Range:</strong> ${formData.get('budget')}</p>
<h3>Project Description:</h3>
<p>${formData.get('message')}</p>
      `,
    }

    // If there's a file, attach it to the email
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      emailContent.attachments = [
        {
          content: buffer.toString('base64'),
          filename: file.name,
          type: file.type,
        },
      ]
    }

    // Send email
    await sgMail.send(emailContent)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
