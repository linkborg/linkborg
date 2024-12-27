import LoginMagicLink from "@/components/emails/login-magic-link";
import { render } from "@react-email/components";

const PLUNK_BASE_URL = process.env.PLUNK_BASE_URL || "";

export async function sendTransactionEmail(
    template_name: string,
    email: string,
    data: any,
  ) {

    let subject = 'Welcome to LinkBorg'
    let from = 'LinkBorg <noreply@linkb.org>'
  
    if (template_name === 'login') {
      subject = 'Login to LinkBorg'
    } else if (template_name === 'welcome') {
      subject = 'Welcome to LinkBorg!'
      from = 'Anubhav from LinkBorg <anubhav@linkb.org>'
    }

    const body = await render(LoginMagicLink({
        toEmail: email,
        actionUrl: data?.action_url,
        timeString: new Date().toLocaleString('en-US', { 
          dateStyle: 'long',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata'
        })
    }))

    try {
      const response = await fetch(`${PLUNK_BASE_URL}/v1/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.PLUNK_API_KEY || ""
        },
        body: JSON.stringify({
          "to": email,
          "subject": subject,
          "body": body
        })
      });

      if (!response.ok) {
        console.error('Failed to send email:', {
          status: response.status,
          statusText: response.statusText
        });
        throw new Error(`Email sending failed with status ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', {
        to: email,
        subject,
        messageId: result.id
      });

      return result;

    } catch (error) {
      console.error('Error sending email:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        to: email,
        subject
      });
      throw new Error('Failed to send email: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }