import React, { useState, useRef } from 'react';
import { TiHeartFullOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { TiPencil, TiTrash, TiTick, TiTimes } from "react-icons/ti";

import { GiWingedSword } from "react-icons/gi";
import { GiAbdominalArmor } from "react-icons/gi";
import { GiRustySword } from "react-icons/gi";
import { GiPointySword } from "react-icons/gi";
import { GiHeartArmor } from "react-icons/gi";
import { GiEyeShield } from "react-icons/gi";
import { GiRoundShield } from "react-icons/gi";
import { GiHeartShield } from "react-icons/gi";
import { GiSwordBrandish } from "react-icons/gi";
import { GiBroadsword } from "react-icons/gi";
import { GiSwordAltar } from "react-icons/gi";

const levels = [
  "Novice",
  "Initiate",
  "Recruit",
  "Squire",
  "Adventurer",
  "Knight",
  "Warrior",
  "Protector",
  "Guardian",
  "Champion",
  "Legend",
]

const LevelIcon = (props) => {
  const classes = "scale-5000 h-100 z-0"
  switch (props.level) {
    case 0:
      return (<GiRustySword className={classes} />)
    case 1:
      return (<GiRoundShield className={classes} />)
    case 2:
      return (<GiHeartArmor className={classes} />)
    case 3:
      return (<GiPointySword className={classes} />)
    case 4:
      return (<GiSwordBrandish className={classes} />)
    case 5:
      return (<GiBroadsword className={classes} />)
    case 6:
      return (<GiAbdominalArmor className={classes} />)
    case 7:
      return (<GiHeartShield className={classes} />)
    case 8:
      return (<GiEyeShield className={classes} />)
    case 9:
      return (<GiWingedSword className={classes} />)
    case 10:
      return (<GiSwordAltar className={classes} />)
  }
}

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
  "#ff8b40",
  "#fff840",
  "#8cfcb2",
  "#40fffe",
  "center / 130px url(https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/158/posts/37453/image-upload/RainbowGradientOverlay13.jpg)",
]

const MyWidget = () => {
  const [level, setLevel] = useState(0)
  const [hp, setHp] = useState(100)
  const [xp, setXp] = useState(0)
  const xpToLevel = useRef(100)
  const maxLevel = 10

  const [userName, setUserName] = useState("Name")
  const [habits, setHabits] = useState([{ name: "Test Habit", checked: false },
  { name: "Habit 2", checked: false }
  ])

  //Tracks the index of habit that is currently being edited (null if none are being edited)
  const [editingHabitIndex, setEditingHabitIndex] = useState(null)

  const addHabit = (newHabitName) => setHabits([...habits, { name: newHabitName, checked: false }])

  const editHabitName = (habitIndex, newHabitName) => {
    let newHabits = [...habits]
    newHabits[habitIndex] = { name: newHabitName, checked: habits[habitIndex].checked }
    setHabits(newHabits)
  }

  const deleteHabit = (habitIndex) => {
    let newHabits = []
    for (let i = 0; i < habits.length; i++) {
      if (i !== habitIndex)
        newHabits.push(habits[i])
    }


    setHabits(newHabits)
  }

  const levelUpOrDown = (levelUp) => {
    let newLevel = level

    if (levelUp && level < 10)
      newLevel = level + 1
    else if(!levelUp && level > 1)
      newLevel = level - 1

    xpToLevel.current = 100 + (50 * (newLevel - 1))
    setLevel(newLevel);
      setHp(100); 
      levelUpOrDown(false)
    }
  }

  const changeXp = (xpChange) => {
    let newXp = xp + xpChange


    if(newXp >= xpToLevel.current) {
      if (level < maxLevel)
        levelUpOrDown(true);
      else
        newXp = xp
    }

    setXp(newXp);
  }

  const checkHabit = (habitIndex) => {
    let newHabits = [...habits]
    let isChecked = !newHabits[habitIndex].checked
    newHabits[habitIndex].checked = isChecked ? true : null
    
    if(isChecked)
      changeXp(10)
    else
      changeXp(-10)

    setHabits(newHabits)
  }

  const setEditingHabit = (habitIndex) => {
    if (editingHabitIndex === habitIndex) {
      setEditingHabitIndex(null)
    }
    else {
      setEditingHabitIndex(habitIndex)
    }
  }
  return (
    <div className="p-6 max-w-4xl w-150 mx-auto h-140 bg-white rounded-xl shadow-lg flex justify-between items-start">
      <div className="bg-white rounded-xl shadow-md p-4 w-75 h-125 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Hello {userName}!</h2>
        <div className="text-xl font-bold text-blue-600">Daily Tasks
        </div>
        <div className="border-2 bg-green-500/75 h-100 bg-clip-border p-3">Habits List
          {habits.map((habit, index) => (
            <Habit key={index} habitName={habit.name} beingEdited={index === editingHabitIndex}
              isChecked={habit.checked}
              onDeleteClicked={() => deleteHabit(index)}
              onEditClicked={() => setEditingHabit(index)}
              onCheckClicked={() => checkHabit(index)}
              onEditName={(newName) => editHabitName(index, newName)} />
          ))}
        </div>
        <div class="h-2"></div>
        <div className="bg-white rounded-xl shadow-md h-40 flex flex-col justify-end">
          <div className="text-xl font-bold text-indigo-600">Current Status</div>
            <ProgressBar type="hp" level={level} progress={hp} />
            <ProgressBar type="xp" level={level} progress={(xp/xpToLevel.current) * 100} />
        </div>
      </div>
      {/* Debug Buttons 
      <button className="bg-red-100" onClick={changeHp}>Change hp</button>
      <button className="bg-red-100" onClick={() => changeXp(10)}>Change xp</button>
      <button className="bg-red-100" onClick={() => levelUpOrDown(true)}>Increase level</button>
      <p>Level: {levels[level]}</p>
      < LevelIcon level={level}/>*/}
      <div className="bg-white rounded-xl shadow-md p-4 w-1/2 h-[500px] flex flex-col">
        <div className="text-xl font-bold text-indigo-600">User Profile</div>
        <div className="border-2 bg-blue-500/75 w-30 h-30 bg-clip-border p-3">Icon Here</div>
        <div class="h-8"></div>
        <div className="border-2 bg-cyan-500/75 w-60 h-60 bg-clip-border p-3">Level Description</div>
      </div>
    </div>
  );
};

const Habit = ({ habitName, beingEdited, isChecked, onEditClicked, onDeleteClicked, onCheckClicked, onEditName }) => {
  const handleNameChange = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries())

    onEditName(formJson.newName !== "" ? formJson.newName : habitName)
    onEditClicked()
  }

  return (
    <div className="flex gap-5">
      <input type="checkbox"
        className='border-gray-400 hover:scale-140 hover:border-black transition-all'
        onClick={onCheckClicked}
        defaultChecked={isChecked} />


      {/* Name/edit box */}
      {!beingEdited ?
        <p>{habitName}</p> :
        <form className="flex gap-2" onSubmit={handleNameChange}>
          <input type="text" name="newName" placeholder={habitName} className='border-1 rounded-md w-30' maxLength={30} />
          <button type="submit" className='border-green-500 border-1 rounded-md scale-100 box-border
                        transition-all hover:border-black hover:scale-125'><TiTick />
          </button>
          <button className='border-green-500 border-1 rounded-md scale-100 box-border
                        transition-all hover:border-black hover:scale-125'
            onClick={onEditClicked}><TiTimes />
          </button>
        </form>
      }

      { /* Edit & Delete Icons */}

      {!beingEdited &&
        <div className='ml-auto flex gap-2 justify-end'>
          <button className='border-green-500 border-1 rounded-md ml-auto box-border transition-all
                      hover:border-black hover:scale-125'
            onClick={onEditClicked}><TiPencil />
          </button>
          <button className='border-green-500 border-1 rounded-md scale-100 box-border
                          transition-all hover:border-black hover:scale-125'
            onClick={onDeleteClicked}><TiTrash />
          </button>
        </div>}
    </div>
  )
}

const ProgressBar = (props) => {
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
