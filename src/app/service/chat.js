const apiUrl = '/api/groq'; 

export async function sendMessage(userId, messageContent) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, messageContent }), 
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.error || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.message; 
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; 
    }
}
