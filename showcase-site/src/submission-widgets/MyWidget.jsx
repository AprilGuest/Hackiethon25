import React, { useState } from 'react';
import { TiHeartFullOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { TiPencil, TiTrash } from "react-icons/ti";

const MyWidget = () => {
  const [level, setLevel] = useState(0)
  const [hp, setHp] = useState(100)
  const [xp, setXp] = useState(0)

  const [userName, setUserName] = useState("Name")
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

  const levelUp = () => {
    if (level < 10) {
      setLevel(level+1);
    } else {
      setLevel(0);
    }
  }

  const changeHp = () => {
    if (hp >= 10) {
      setHp(hp - 10);
    } else {
      setHp(100);
    }
  }

  const changeXp = () => {
    if (xp <= 90) {
      setXp(xp + 10);
    } else {
      setXp(0);
      levelUp();
    }
  }

  const checkHabit = (habitIndex) => {
    let newHabits = [...habits]
    newHabits[habitIndex].checked = !newHabits[habitIndex].checked
    setHabits(newHabits)
  }

    return (
    <div className="p-6 max-w-4xl w-150 mx-auto h-150 bg-white rounded-xl shadow-lg flex justify-between items-start">
      <div className="bg-white rounded-xl shadow-md p-4 w-75 h-125 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Hello {userName}!</h2>
          <div className="text-xl font-bold text-blue-600">Daily Tasks
        </div>
        <div className="border-4 bg-green-500 w-40 h-100 bg-clip-border p-3">To-do List
        </div>
        <div className="bg-white rounded-xl shadow-md h-40 flex flex-col justify-end">
          <div className="text-xl font-bold text-indigo-600">Current Status</div>
          <div className="border-4 bg-blue-500 w-40 h-10 bg-clip-border p-3">HP Bar</div>
          <div className="border-4 bg-cyan-500 w-40 h-10 bg-clip-border p-3">XP Bar</div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 w-1/2 h-[500px] flex flex-col">
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
  const hpcolors = {
    5: "#740000",
    10: "#e24221",
    25: "#f7921a",
    37: "#fbb72a",
    50: "#ffe13d",
    70: "#bce444",
    100: "#66e74e",
  }
  const xpcolors = [
    "#05003d",
    "#261ca3",
    "#4f0b99",
    "#9d49ff",
    "#d841ff",
    "#ff4099",
    "red", // Do some fancy gradients or something
    "red",
    "red",
    "red",
    "red",
  ]

  const getHpColor = () => {
    if (props.type == 'hp') {
      for (let i in hpcolors) {
        if (props.progress <= i) {
          return hpcolors[i];
        }
      }
    }
  }

  // const updateProgress = () => {
  //   // Modify if needed
  //   if (progress == 100) {
  //     setProgress(0);
  //   } else if (progress >= 90) {
  //     setProgress(100);
  //   } else {
  //     setProgress(progress+10);
  //   }
  // }

  return (
    <div className="block mt-4 mb-4 w-full">
      {props.type == "hp" ? <TiHeartFullOutline /> : <TiStarFullOutline />}
      <div className="bg-gray-200 rounded-full h-4 w-100%"> 
        <div 
          className="rounded-full h-full transition-all duration-500"
          style={{
                  width: `${props.progress}%`,
                  background: (props.type == "xp" ? xpcolors[props.level] : getHpColor()),
                }}
        ></div>
      </div>
    </div>
  )
}

export default MyWidget;
