import React, { useState } from 'react';

const MyWidget = () => {

  const [habits, setHabits] = useState(["Test Habit"])

  //Tracks the habit that is currently being edited (null if none are being edited)
  const [editingHabit, setEditingHabit] = useState(null)

  const addHabit = (newHabitName) => setHabits([...habits, newHabitName])

  const editHabit = (habitIndex, newHabitName) => {
    let newHabits = [...habits]
    newHabits[habitIndex] = newHabitName
    setHabits(newHabits)
  }

  const deleteHabit = (habitIndex) => {
    let newHabits = []
    for(let i = 0; i < habits.length; i++) {
      if (i !== habitIndex)
        newHabits.push(habits[i])
    }


    setHabits(newHabits)
  }

    return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg flex justify-between items-start">
      <div className="bg-white rounded-xl shadow-md  h-[500px] flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Hello {userName}!</h2>
        <div className="text-xl font-bold text-blue-600">
          Daily Tasks
        <div className="border-4 bg-green-500 w-40 h-70 bg-clip-border p-3">To-do List
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-end">
          <div className="text-xl font-bold text-indigo-600">Current Status</div>
          <div className="border-4 bg-blue-500 w-40 h-10 bg-clip-border p-3">HP Bar</div>
          <div className="border-4 bg-cyan-500 w-40 h-10 bg-clip-border p-3">XP Bar</div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 w-1/2 h-[500px] flex flex-col justify-between ">
        <div className="text-xl font-bold text-indigo-600">User Profile</div>
        <div className="border-4 bg-blue-500 w-40 h-40 bg-clip-border p-3">Emoji Here</div>
        <div className="border-4 bg-cyan-500 w-50 h-40 bg-clip-border p-3">Level Description</div>
      </div>
      <ProgressBar type="hp" />
      <ProgressBar type="xp" />
    </div>
  );
};

const ProgressBar = (props) => {
  // const colors = {
  //   5: "darkred",
  //   10: "firebrick",
  //   20: "darkorange",
  //   40: "orange",
  //   60: "gold",
  //   80: "olivedrab",
  //   100: "limegreen",
  // }
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("limegreen");

  const addProgress = () => {
    if (progress >= 90) {
      setProgress(100);
    } else {
      setProgress(progress+10);
    }
  }
  const resetProgress = () => setProgress(0);


  // if (props.type == 'hp') {
  //   for (i in colors.keys) {
  //     if (progress <= i) {
  //       setColor(colors[i]);
  //       alert(`Set color to ${color}.`)
  //       break
  //     }
  //   }
  // }

  return (
    <div>
      <div className="size-100% bg-gray-200 rounded-full h-4 block mt-4 mb-4"> 
        <div 
          className="rounded-full h-full transition-all duration-500"
          style={{
                  width: `${progress}%`,
                  background: color,
                }}
        ></div>
      </div>
      {/* Remove later */}
      <button className="bg-red-100" onClick={addProgress}>Increase</button>
      <button className="bg-red-100" onClick={resetProgress}>Reset</button>
    </div>
  )
}

export default MyWidget;
