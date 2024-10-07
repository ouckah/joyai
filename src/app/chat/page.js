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
      sender: BOT,
      text: "Hello, I am Joy AI. How can I help you today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);



  const typeMessage = (message, setMessages, sender) => {
    let index = -1;
    const typingSpeed = 30; 
   
  
    function typeNextCharacter() {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
  
        const updatedMessage = lastMessage?.text !== undefined
          ? lastMessage.text + message[index]
          : message[index];
  
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          text: updatedMessage,
        };
  
        return newMessages;
      });
  
      index++;
  
      if (index < message.length-1) {
        setTimeout(typeNextCharacter, typingSpeed);
      }
      else {
        setLoading(false);
      }
    }
  
    // Add a new empty message from the bot
    setMessages(prevMessages => [
      ...prevMessages,
      { sender, text: '' }
    ]);
  
    typeNextCharacter();
  };
  
  

  const handleSendMessage = async (e) => {
    
    e.preventDefault();

    // avoid sending message while bot is typing
    if (loading) {
      return;
    }
    if (!inputValue.trim()) return; // avoid empty messages

    const newMessage = {
      sender: USER,
      text: inputValue,
    };

    // update messages array
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);

    try {
      const response = await sendMessage(0, inputValue); // userId is 0 for now

      typeMessage(response, setMessages, 'bot');

    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: 'Error: Unable to fetch response.' }
      ]);
    } finally {
      setInputValue(''); 
       
    }
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
