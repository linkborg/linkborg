import {sendTransactionEmail} from "@/lib/plunk";

async function sendVerificationRequest(params: { identifier: string, url: string }) {
    
    const {identifier, url} = params;
    
    const data = {
        to_email: identifier,
        action_url: url
    };
    
    if(process.env.EMAIL_PROVIDER === "local"){
        console.log("Email provider is local, skipping email sending");
        console.log(data);
        return;
    }
    
    try{
        console.log("Trying to send email")
        await sendTransactionEmail('login', identifier, data)
    } catch (error) {
        throw new Error(`Email delivery failed. Try again later.`)
    }
}

export default sendVerificationRequest;