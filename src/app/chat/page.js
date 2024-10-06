/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { USER, BOT } from "../../constants/senders";
import { ScrollContainer } from "../_components/ScrollableContainer";
import { Navbar } from "../_components/Navbar";
import { sendMessage } from "../service/chat";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: USER,
      text: "Hello.",
    },
    {
      sender: BOT,
      text: "Hello user! How are you?",
    },
    {
      sender: USER,
      text: "I've been aight.",
    },
    {
      sender: BOT,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      sender: USER,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // avoid empty messages

    const newMessage = {
      sender: USER,
      text: inputValue,
    };

    // update messages array
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      // Await the bot's response
      const responseValue = await sendMessage(0, inputValue);

      const newResponse = {
        sender: BOT,
        text: responseValue, 
      };

      setMessages((prevMessages) => [...prevMessages, newResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // clear input field after sending message
    setInputValue("");
  };

  return (
    <div
      data-theme="autumn"
      className="flex items-center justify-items-center w-screen h-screen bg-white pl-12 font-[family-name:var(--font-geist-sans)]"
    >
      <main className="bg-white flex flex-row gap-8 items-center sm:items-start w-full h-full">
        <Navbar />
        <div className="flex flex-col justify-end items-center w-full h-full gap-14 py-16 bg-white">
          {/* Messages */}
          <div className="flex flex-col justify-end items-center w-3/4 h-full overflow-x-hidden">
            <ScrollContainer>
              {messages.map((message, i) => {
                if (message.sender == BOT) {
                  return (
                    <div
                      key={i}
                      className="chat chat-start self-start w-3/4 text-xl"
                    >
                      <div className="chat-image avatar">
                        <div className="w-20 rounded-full">
                          <img
                            alt="JoyAI PFP"
                            src="/image/joypfp.png"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center items-center chat-header gap-3">
                        Joy
                        <time className="text-xs opacity-50">12:45</time>
                      </div>
                      <div className="chat-bubble chat-bubble-accent bg-joy-pink">
                        {message.text}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className="chat chat-end self-end w-3/4 text-xl"
                    >
                      <div className="chat-bubble chat-bubble-neutral">
                        {message.text}
                      </div>
                    </div>
                  );
                }
              })}
            </ScrollContainer>
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="w-3/4">
            <input
              className="flex justify-start items-center w-full h-24 bg-joy-pink p-10 rounded-full outline-none"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
