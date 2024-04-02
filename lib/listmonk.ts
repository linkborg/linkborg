const LISTMONK_URL = process.env.LISTMONK_URL || "";
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME || "";
const LISTMONK_PASSWORD = process.env.LISTMONK_PASSWORD || "";

const base64EncodedCredentials = Buffer.from(`${LISTMONK_USERNAME}:${LISTMONK_PASSWORD}`).toString('base64');

export async function addSubscriber(data: object) {
    const response = await fetch(`${LISTMONK_URL}/subscribers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64EncodedCredentials}`,
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    
    return response.json();
}

export async function removeSubscriber(subscriber_id: string) {
    const response = await fetch(`${LISTMONK_URL}/subscribers/${subscriber_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64EncodedCredentials}`,
        },
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    
    return { message: 'Subscriber removed successfully' };
}

export async function updateSubscriber(subscriber_id: string, data: object) {
    const response = await fetch(`${LISTMONK_URL}/subscribers/${subscriber_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64EncodedCredentials}`,
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        console.log("There was an error!")
        console.log(response.statusText);
        throw new Error(response.statusText);
    }
    
    console.log("updateSubscriber")
    
    const result = await response.json();
    console.log("result of update subs", result);
    
    return result;
}

export async function addSubscriberToList(subscriber_id: string) {
    const response = await fetch(`${LISTMONK_URL}/subscribers/lists`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64EncodedCredentials}`,
        },
        body: JSON.stringify({
            ids: [subscriber_id].map(num => parseInt(num)),
            action: "add",
            target_list_ids: [4],
            status: "confirmed"
        }),
    });
    
    if (!response.ok) {
        throw new Error(response.statusText as string);
    }
    
    return await response.json();
    
}

export async function removeSubscriberFromList(subscriber_id: string) {
    const response = await fetch(`${LISTMONK_URL}/subscribers/lists`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64EncodedCredentials}`,
        },
        body: JSON.stringify({
            ids: [subscriber_id].map(num => parseInt(num)),
            action: "remove",
            target_list_ids: [4]
        }),
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    
    return await response.json();
}

export async function sendTransactionEmail(template_name: string, email: string, data: object) {
    
    let template_id = 4;
    let from_email = "vectorize.sh <noreply@vectorize.sh>"
    
    if (template_name === "login"){
        template_id = 4;
    }
    else if (template_name === "welcome"){
        template_id = 5;
        from_email = "Anubhav from vectorize.sh<anubhav@vectorize.sh>";
    }
    
    const response = await fetch(`${LISTMONK_URL}/tx`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64EncodedCredentials}`,
        },
        body: JSON.stringify({
            subscriber_email: email,
            template_id: template_id,
            data: data,
            content_type: "html",
            from_email: from_email
        }),
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    
    return await response.json();
}
