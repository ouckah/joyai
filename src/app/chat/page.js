import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="bg-white flex flex-row gap-8 items-center sm:items-start w-screen h-screen">
        <div className="flex justify-center items-center w-40 h-screen bg-red-50">
          <div className="flex justify-center items-center w-full h-96 bg-yellow-100 rounded-full">
            test
          </div>
        </div>
        <div className="flex justify-center items-end w-full h-screen bg-blue-50 p-20">
          <input
            className="flex justify-start items-center w-3/4 h-24 bg-green-50 p-10 rounded-full outline-none"
            placeholder="Ask me anything..."
          />
        </div>
      </main>
    </div>
  );
}
