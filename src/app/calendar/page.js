"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "../_components/Navbar";
import { BAD, MEH, NEUTRAL, OKAY, GOOD } from "@/constants/mood";

// mock data
let moodData = [
  { index: 0, mood: BAD },
  { index: 1, mood: NEUTRAL },
  { index: 2, mood: GOOD },
  // last cell is editable
  { index: 3, mood: NEUTRAL },
];

// function to map mood to color
const getMoodColor = (mood) => {
  switch (mood) {
    case BAD:
      return "bg-red-500"; // Red for BAD mood
    case MEH:
      return "bg-yellow-500"; // Yellow for MEH mood
    case NEUTRAL:
      return "bg-gray-500"; // Gray for NEUTRAL mood
    case OKAY:
      return "bg-blue-500"; // Blue for OKAY mood
    case GOOD:
      return "bg-green-500"; // Green for GOOD mood
    default:
      return "bg-white"; // Default color if no mood is set
  }
};

export default function Calendar() {
  return (
    <div
      data-theme="autumn"
      className="flex items-center justify-items-center w-screen h-screen bg-white pl-12 font-[family-name:var(--font-geist-sans)]"
    >
      <main className="bg-white flex flex-row gap-8 items-center sm:items-start w-full h-full">
        <Navbar />
        <div className="flex flex-col justify-center items-center w-full h-full gap-14 py-16 bg-white">
          <CalendarComponent />
        </div>
      </main>
    </div>
  );
}

const CalendarComponent = ({}) => {
  // calculate the average mood based on moodData
  const calculateAverageMood = (moodData) => {
    const totalMoodValue = moodData.reduce(
      (total, moodObj) => total + moodObj.mood,
      0
    );
    return Math.ceil(totalMoodValue / moodData.length);
  };

  // state to track the selected mood for the last editable cell
  const [editableMood, setEditableMood] = useState(
    moodData[moodData.length - 1].mood
  );
  const [averageMoodValue, setAverageMoodValue] = useState(
    calculateAverageMood(moodData)
  );

  // function to recalculate average mood when editableMood is updated
  useEffect(() => {
    const updatedMoodData = [...moodData];
    updatedMoodData[moodData.length - 1].mood = editableMood;
    setAverageMoodValue(calculateAverageMood(updatedMoodData));
  }, [editableMood]);

  return (
    <div className="flex flex-col justify-center items-start w-1/2 h-2/3 gap-5 bg-white">
      <h1 className="text-neutral font-medium text-5xl translate-x-12">
        Month
      </h1>
      <div className="flex flex-row w-full h-full bg-joy-pink rounded-3xl p-4">
        <div className="grid grid-cols-7 w-3/4 h-full gap-5 p-2">
          {Array.from({ length: 35 }).map((_, i) => {
            // find mood for the current index
            const moodObj = moodData.find((m) => m.index === i);
            const moodColor = moodObj ? getMoodColor(moodObj.mood) : "bg-white";

            // last cell should be editable
            if (i === moodData.length - 1) {
              return (
                <>
                  <button
                    key={i}
                    onClick={() =>
                      document.getElementById("set_mood").showModal()
                    }
                    className="flex items-center justify-center w-15 h-15 bg-white rounded-3xl"
                  >
                    <div
                      className={`w-1/2 h-1/2 hover:w-3/4 hover:h-3/4 duration-300 transition-all ${getMoodColor(
                        editableMood
                      )} rounded-3xl`}
                    />
                  </button>
                  <MoodEditor mood={editableMood} setMood={setEditableMood} />
                </>
              );
            }

            return (
              <div
                key={i}
                className={`w-15 h-15 ${moodColor} rounded-3xl flex items-center justify-center`}
              ></div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 h-full gap-5">
          <h1 className="text-neutral font-medium text-3xl text-center">
            Monthly Mood
          </h1>
          <div
            className={`w-3/4 h-1/2 bg-white rounded-3xl flex items-center justify-center`}
          >
            <div
              className={`w-3/4 h-3/4 ${getMoodColor(
                averageMoodValue
              )} rounded-3xl`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MoodEditor = ({ mood, setMood }) => {
  const moodOptions = [
    { label: "Bad", value: BAD },
    { label: "Meh", value: MEH },
    { label: "Neutral", value: NEUTRAL },
    { label: "Okay", value: OKAY },
    { label: "Good", value: GOOD },
  ];

  const modalRef = useRef(null);

  const setMoodAndClose = (selectedMood) => {
    setMood(selectedMood);
    modalRef.current.close();
  };

  return (
    <dialog ref={modalRef} id="set_mood" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Select Mood</h3>
        <div className="py-4 flex flex-col gap-2">
          {moodOptions.map((option) => (
            <div
              key={option.value}
              className={`w-full p-2 cursor-pointer rounded-lg ${
                option.value === mood ? "ring-2 ring-blue-500" : ""
              } ${getMoodColor(option.value)}`}
              onClick={() => setMoodAndClose(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};
