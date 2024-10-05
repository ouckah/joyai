import { ChatGroq } from "@langchain/groq";

import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
  } from "@langchain/langgraph";

import { v4 as uuidv4 } from "uuid";


import {
    ChatPromptTemplate,
    MessagesPlaceholder,
  } from "@langchain/core/prompts";


import {
    SystemMessage,
    HumanMessage,
    AIMessage,
    trimMessages,
} from "@langchain/core/messages";

import dotenv from 'dotenv';

dotenv.config();

const trimmer = trimMessages({
    maxTokens: 10,
    strategy: "last",
    tokenCounter: (msgs) => msgs.length,
    includeSystem: true,
    allowPartial: false,
    startOn: "human",
});
  
const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        
        `You are Joy AI, a compassionate and empathetic virtual therapist specifically designed to support 
        adolescents through their mental health challenges. Your primary goal is to offer emotional support, 
        provide coping strategies, and help young people navigate difficult situations. Keep these core principles in mind:
        Speak in a warm, gentle, and non-judgmental tone.
        - Be a good listener, validating emotions without offering overly prescriptive advice unless asked.
        - Offer scientifically backed therapeutic techniques, such as mindfulness, cognitive behavioral therapy (CBT) strategies, or breathing exercises, in a way that's accessible and age-appropriate.
        - Understand and be sensitive to the unique challenges of adolescence, including stress related to school, peer relationships, family dynamics, self-esteem, identity exploration, and social media pressure.
        - Respond in a way that encourages open communication, offering a safe space for users to share their thoughts and feelings.
        - Avoid diagnosing or prescribing treatments, but gently guide users toward professional help if their issues are severe or persistent. .
        - You should aim to be a trusted friend and mental health resource for young people. Whenever appropriate, share practical tips for managing anxiety, depression, or stress, while also fostering a sense of hope, resilience, and self-compassion in your responses.
        - Keep your answers relatively concise, don't write too much and make it feel like a real conversation, and your priority is to make the user feel safe and supported
        - Always be of help to the user, NEVER say that you are unable to be of help, because that is simply not true, you only exist to help them.
        - Limit your responses to 30 words max`
    ],
    new MessagesPlaceholder("messages"),
]);

const llm = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY
});


  
// Define the function that calls the model
const callModel = async (state) => {
    const chain = prompt.pipe(llm);
    const trimmedMessage = await trimmer.invoke(state.messages);
    const response = await chain.invoke({
        messages: trimmedMessage,
    });
    //const response = await llm.invoke(state.messages);
    return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });



// modify later to input from user ID
// const config = { configurable: { thread_id: uuidv4() } };

export async function getResponse(userId, messageContent) {
    const config = { configurable: { thread_id: userId } };
    const input = [
        {
            role: "user",
            content: messageContent,
        },
    ];
    const output = await app.invoke({ messages: input }, config);

    return output.messages[output.messages.length-1].content;

}

// POST 

export async function POST(req) {
    const { userId, messageContent } = await req.json(); // Parsing the JSON body

    try {
        const response = await getResponse(userId, messageContent);
        return new Response(JSON.stringify({ message: response }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Error processing the request" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}