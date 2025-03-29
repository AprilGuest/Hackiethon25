import React, { useState, useRef, useEffect } from 'react';
import { TiHeartFullOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { TiPencil, TiTrash, TiTick, TiTimes, TiPlus } from "react-icons/ti";

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

const levelInfo = [
  {"minxp": 0, "name": "Novice", "description": "Welcome, fledgling hero! As a Novice, your journey has just begun, and every small step you take builds the foundation for greatness. Embrace the challenges ahead, for they are the first steps toward becoming a legendary figure in your world."},
  {"minxp": 100, "name": "Initiate", "description": "The path of the hero grows clearer. As an Initiate, you’ve proven your commitment, and now it’s time to hone your skills and craft. Push forward with courage, for each habit completed strengthens your resolve and prepares you for the trials yet to come."},
  {"minxp": 250, "name": "Recruit", "description": "You’ve joined the ranks of those who seek glory! As a Recruit, your courage and discipline are beginning to show. Embrace your role in the larger quest, and know that with each challenge overcome, your strength and influence grow ever greater."},
  {"minxp": 450, "name": "Squire", "description": "The mantle of responsibility calls to you. As a Squire, you train alongside masters, learning the ways of warriors past. Your dedication to improving yourself not only builds your character but prepares you for the greatness that lies ahead."},
  {"minxp": 700, "name": "Adventurer", "description": "The world opens before you, filled with endless possibilities. As an Adventurer, you have proven your willingness to explore the unknown and face the challenges of life head-on. Keep moving forward, for the world is full of treasures waiting for those brave enough to seek them."},
  {"minxp": 1000, "name": "Knight", "description": "A true hero stands tall in the face of adversity. As a Knight, your training and experience are unmatched, and your presence commands respect. With unwavering determination, you will continue to grow stronger, protecting those who need it most as you forge your path."},
  {"minxp": 1350, "name": "Warrior", "description": "No challenge is too great for a Warrior of your caliber. As a seasoned fighter, your skills are honed and your heart steeled. Each habit completed is another battle won, another step toward mastery that shapes you into an unstoppable force."},
  {"minxp": 1750, "name": "Protector", "description": "You are a guardian of peace and justice, a beacon of strength. As a Protector, you stand resolute, defending not just yourself but others as well. Your actions now carry the weight of responsibility, and with each victory, you inspire others to rise alongside you."},
  {"minxp": 2200, "name": "Guardian", "description": "The world relies on you to stand vigilant and strong. As a Guardian, you are the shield against the chaos that threatens all. Your dedication and courage are unmatched, and with each habit completed, you fortify not only yourself but the very world you seek to protect."},
  {"minxp": 2700, "name": "Champion", "description": "You have risen above, a true legend in the making. As a Champion, your skill and wisdom are unparalleled, and your influence stretches far and wide. You are a force for good, a hero whose actions inspire the world to rise to greatness alongside you."},
  {"minxp": 3250, "name": "Legend", "description": "You stand at the peak, the embodiment of a hero’s journey. As a Legend, your name will be remembered for ages to come, and your every action echoes through history. With unwavering resolve and an unbreakable spirit, you have achieved the ultimate mastery—now continue to inspire all those who follow in your footsteps."},
  {"minxp": 4000}
]

const LevelIcon = (props) => {
  const classes = "w-50 h-50 z-0"
  switch (props.level) {
    case 0:
      return (<GiRustySword className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 1:
      return (<GiRoundShield className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 2:
      return (<GiHeartArmor className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 3:
      return (<GiPointySword className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 4:
      return (<GiSwordBrandish className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 5:
      return (<GiBroadsword className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 6:
      return (<GiAbdominalArmor className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 7:
      return (<GiHeartShield className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 8:
      return (<GiEyeShield className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 9:
      return (<GiWingedSword className={classes} style={{ fill: xpcolors[props.level] }} />)
    case 10:
      return (<GiSwordAltar className={classes} style={{ fill: "var(--color-cyan-500)" }} />)
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
  "linear-gradient(77deg, rgba(255,26,153,1) 0%, rgba(255,51,74,1) 23%, rgba(236,215,0,1) 50%, rgba(0,218,160,1) 77%, rgba(0,213,164,1) 80%, rgba(9,106,249,1) 100%)",
]

const MyWidget = () => {
  const [level, setLevel] = useState(0)
  const [hp, setHp] = useState(100)
  const [xp, setXp] = useState(0)
  const lastUpdatedXP = useRef(true)
  const maxLevel = 10

  const [userName, setUserName] = useState("Name")
  const [habits, setHabits] = useState([{ name: "Test Habit", checked: false },
  { name: "Habit 2", checked: false }
  ])

  const [displayDate, setDisplayDate] = useState(new Date())

  //Tracks the index of habit that is currently being edited (null if none are being edited)
  const [editingHabitIndex, setEditingHabitIndex] = useState(null)

  const addHabit = (newHabitName) => {
    setHabits([...habits, { name: newHabitName, checked: false }]);
    setEditingHabit(habits.length);
  }

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

  const checkHabit = (habitIndex) => {
    let newHabits = [...habits]
    let isChecked = !newHabits[habitIndex].checked
    newHabits[habitIndex].checked = isChecked ? true : null
    
    if(hp === 100) {
      if(isChecked)
        changeXp(10)
      else
        changeXp(-10)
    } else {
      if(isChecked)
        changeHp(10)
      else
        changeHp(-10)
    }

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

  // Level up, XP and HP handlers

  const levelUpOrDown = (levelUp) => {
    let newLevel = level

    if (levelUp && level < maxLevel)
      newLevel = level + 1
    else if(!levelUp && level > 0)
      newLevel = level - 1

    setLevel(newLevel);
    setHp(100); 
  }
  

  const changeXp = (xpChange) => {
    let newXp = xp + xpChange
    if (newXp < 0) {
      newXp = 0;
    }

    // If level up
    if(newXp > levelInfo[level+1].minxp && level < maxLevel) {
      levelUpOrDown(true);
    // If level down
    } else if (newXp < levelInfo[level].minxp) {
      levelUpOrDown(false);
    } 

    setXp(newXp);
  }

  const changeHp = (hpChange) => {
    let newHp = hp + hpChange
    if (newHp > 100)
      newHp = 100
    else if(newHp < 0) {
      levelUpOrDown(false)
      newHp = 100
    }

    setHp(newHp)
  }

  //Date & local storage handling

  const increaseDate = () => {
    let newDate = new Date(displayDate)
    newDate.setDate(newDate.getDate() + 1)

    updateHabitsUponDateChange()

    setDisplayDate(newDate)
  }

  const updateHabitsUponDateChange = () => {
    let newHabits = [...habits]

    let decreaseHP = false

    //We want to decrease HP if the user hasn't completed all habits in a day
    for(let habit of newHabits) {
      if(!habit.checked)
        decreaseHP = true 
      else
        habit.checked = false
    }

    if(decreaseHP)
      changeHp(-10)

    setHabits(newHabits)
  }

  useEffect(() => {
    let storedDateData = localStorage.getItem("date")
    if (storedDateData === null)
      localStorage.setItem("date", new Date().getDate())
    else {
      let storedDate = new Date(storedDateData)
      if (storedDate.getDate() !== new Date().getDate()) {
        let currentDate = new Date().getDate()
        localStorage.setItem("date", currentDate)
        updateHabitsUponDateChange()
      }
    }
  }, [])

  return (
    <div className="p-6 max-w-4xl w-150 mx-auto h-160 bg-white rounded-xl shadow-lg flex flex-col">
      <div className="flex justify-between items-start">
      <div className="bg-white rounded-xl shadow-md p-4 w-75 h-125 flex flex-col mr-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Hello {userName}!</h2>
        <div className="text-xl font-bold text-indigo-600 text-center">Daily Tasks
        </div>
        <div className="bg-cyan-500 h-100 max-h-100 bg-clip-border p-3 rounded-xl">
          {habits.map((habit, index) => (
            <Habit key={index} habitName={habit.name} beingEdited={index === editingHabitIndex}
              isChecked={habit.checked}
              onDeleteClicked={() => deleteHabit(index)}
              onEditClicked={() => setEditingHabit(index)}
              onCheckClicked={() => checkHabit(index)}
              onEditName={(newName) => editHabitName(index, newName)} />
          ))}
          {/* Needs styling */}
          <button className="" onClick={() => addHabit("New habit")}><TiPlus /></button>
        </div>
        <div className="h-2"></div>
        <div className="bg-white rounded-xl h-40 flex flex-col justify-end">
          <div className="text-xl font-bold text-indigo-600 text-center">Current Status</div>
            <ProgressBar type="hp" level={level} progress={hp} />
            <ProgressBar type="xp" level={level} progress={((xp-levelInfo[level].minxp)/(levelInfo[level+1].minxp-levelInfo[level].minxp)) * 100} />
        </div>
      </div>
      {/* Debug Buttons 
      <button className="bg-red-100" onClick={changeHp}>Change hp</button>
      <button className="bg-red-100" onClick={() => changeXp(10)}>Change xp</button>
      <button className="bg-red-100" onClick={() => levelUpOrDown(true)}>Increase level</button>
      */}
      <div className="bg-white rounded-xl shadow-md p-4 w-1/2 h-[500px] flex flex-col">
        <div className="text-xl font-bold text-indigo-600 text-center">{levelInfo[level].name}</div>
        <div className="w-50 h-50 m-5">
          <LevelIcon level={level}/>
        </div>
        <div className="bg-cyan-500 w-full bg-clip-border p-3 rounded-xl">
          <div className="text-xs text-center">{levelInfo[level].description}</div>
        </div>
      </div>
      </div>
      <div className="flex flex-col gap-1 justify-center">
      <div className='flex items-center justify-center gap-2 p-2 mt-2 border-t-2 border-gray-300'>
          <p>Current Date: {displayDate.toISOString().slice(0, 10)}</p>
          <button className='bg-cyan-500 border-2 border-cyan-300 p-2 rounded-lg shadow-2xl hover:scale-115 transition-[scale]' 
          onClick={() => increaseDate()}>+1 Day</button>
      </div>
      <p className="text-gray-400 text-sm italic">(This is here to showcase functionality and wouldn't appear in real use-cases)</p>
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
        onChange={onCheckClicked}
        checked={isChecked} />

      {/* Name/edit box */}
      {!beingEdited ?
        <p>{habitName}</p> :
        <form className="flex gap-2" onSubmit={handleNameChange}>
          <input type="text" name="newName" placeholder={habitName} className='border-1 rounded-md w-30' maxLength={30} />
          <button type="submit" className='border-cyan-500 border-1 rounded-md scale-100 box-border
                        transition-all hover:border-black hover:scale-125'><TiTick />
          </button>
          <button className='border-cyan-500 border-1 rounded-md scale-100 box-border
                        transition-all hover:border-black hover:scale-125'
            onClick={onEditClicked}><TiTimes />
          </button>
        </form>
      }

      { /* Edit & Delete Icons */}

      {!beingEdited &&
        <div className='ml-auto flex gap-2 justify-end'>
          <button className='border-cyan-500 border-1 rounded-md ml-auto box-border transition-all
                      hover:border-black hover:scale-125'
            onClick={onEditClicked}><TiPencil />
          </button>
          <button className='border-cyan-500 border-1 rounded-md scale-100 box-border
                          transition-all hover:border-black hover:scale-125'
            onClick={onDeleteClicked}><TiTrash />
          </button>
        </div>
        }
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

  return (
    <div className="block w-full">
      {props.type == "hp" ? <TiHeartFullOutline className='inline mr-2' /> : <TiStarFullOutline className='inline mr-2'/>}
      <p className="text-xs inline">{props.type == "hp" ? `Remaining HP: ${props.progress}` : `Level ${props.level}`}</p>
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

// const MyGradient = () => {
//   return (
//     <svg style={{ width:0, height:0, position:"absolute" }} aria-hidden="true" focusable="false">
//         <linearGradient id="champion-gradient" x2="1" y2="1">
//           <stop offset="0%" stop-color="rgba(255,26,153,1)" />
//           <stop offset="23%" stop-color="rgba(255,51,74,1)" />
//           <stop offset="50%" stop-color="rgba(236,215,0,1)" />
//           <stop offset="77%" stop-color="rgba(0,218,160,1)" />
//           <stop offset="80%" stopColor="rgba(0,213,164,1)" />
//           <stop offset="100%" stopColor="rgba(9,106,249,1)" />
//         </linearGradient>
//       </svg>
//   )
// }

export default MyWidget;
