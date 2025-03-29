import React, { useState } from 'react';
import { TiPencil, TiTrash } from "react-icons/ti";

const MyWidget = () => {
  const [habits, setHabits] = useState([{name: "Test Habit", checked:false}])

  //Tracks the index of habit that is currently being edited (null if none are being edited)
  const [editingHabitIndex, setEditingHabitIndex] = useState(null)

  const addHabit = (newHabitName) => setHabits([...habits, {name: newHabitName, checked:false}])

  const editHabit = (habitIndex, newHabitName) => {
    let newHabits = [...habits]
    newHabits[habitIndex] = {name: newHabitName, checked: habits[habitIndex].checked}
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

  const checkHabit = (habitIndex) => {
    let newHabits = [...habits]
    newHabits[habitIndex].checked = !newHabits[habitIndex].checked
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

const Habit = ({habitName, beingEdited, checked, onEditClicked, onDeleteClicked, onCheckClicked}) => {
  return (
    <div className="flex justify-between gap-5">
      <input type="checkbox" className='border-gray-400 hover:scale-140 hover:border-black transition-all'
      onClick={onCheckClicked}/>
      
      {/* Name/edit box */}
      {!beingEdited ? 
      <p>{habitName}</p> : 
      <input type="text" className='border-1 rounded-md'></input>
      }

      { /* Edit & Delete Icons */ }

      <button className='border-white border-1 rounded-md hover:border-black hover:scale-125 ml-auto box-border
                        transition-all'
                        onClick={onEditClicked}><TiPencil /></button>
      <button><TiTrash className='border-white border-1 rounded-md scale-120 hover:border-black hover:scale-160 ml-auto box-border
                        transition-all'/></button>
       </div>
   )
}

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
