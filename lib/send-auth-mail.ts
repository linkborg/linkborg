import {addSubscriber, sendTransactionEmail} from "@/lib/listmonk";

async function sendVerificationRequest(params: { identifier: string, url: string }) {
    
    const {identifier, url} = params;
    
    const data = {
        email: identifier,
        url: url
    };
    
    if(process.env.EMAIL_PROVIDER === "local"){
        console.log("Email provider is local, skipping email sending");
        console.log(data);
        return;
    }
    
    try {
        await addSubscriber({
            email: identifier,
            name: identifier,
            status: "enabled",
            lists: [4],
            preconfirm_subscriptions: true
        })
    } catch (error) {
        console.log(`Subscriber not added, already exists!`)
    }
    
    try{
        console.log("Trying to send email")
        await sendTransactionEmail('login', identifier, data)
    } catch (error) {
        throw new Error(`Email delivery failed. Try again later.`)
    }
}

export default sendVerificationRequest;