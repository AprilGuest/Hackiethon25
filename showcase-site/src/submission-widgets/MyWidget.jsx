import React, { useState } from 'react';
import { TiHeartFullOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { TiPencil, TiTrash, TiTick, TiTimes } from "react-icons/ti";

const MyWidget = () => {
  const [level, setLevel] = useState(0)
  const [hp, setHp] = useState(100)
  const [xp, setXp] = useState(0)

  const [userName, setUserName] = useState("Name")
  const [habits, setHabits] = useState([{name: "Test Habit", checked:false},
    {name: "Habit 2", checked:false}
  ])

  //Tracks the index of habit that is currently being edited (null if none are being edited)
  const [editingHabitIndex, setEditingHabitIndex] = useState(null)

  const addHabit = (newHabitName) => setHabits([...habits, {name: newHabitName, checked:false}])

  const editHabitName = (habitIndex, newHabitName) => {
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

  const setEditingHabit = (habitIndex) => {
    if(editingHabitIndex === habitIndex) {
      setEditingHabitIndex(null)
    }
    else {
      setEditingHabitIndex(habitIndex)
    }
  }

    return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg flex justify-between items-start">
      <div className="bg-white rounded-xl shadow-md p-4 w-1/2 h-[500px] flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Hello {userName}!</h2>
        <div className="text-xl font-bold text-blue-600">
          Daily Tasks
        </div>
        <div className="border-4 bg-green-500 w-70 h-100 bg-clip-border p-3">Habits List
          {habits.map((habit, index) => (
            <Habit key={index} habitName={habit.name} beingEdited={index === editingHabitIndex} 
            isChecked={habit.checked}
            onDeleteClicked={() => deleteHabit(index)}
            onEditClicked={() => setEditingHabit(index)}
            onCheckClicked={() => checkHabit(index)}
            onEditName={(newName) => editHabitName(index, newName)}/>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-md h-40 flex flex-col justify-end">
          <div className="text-xl font-bold text-indigo-600">Current Status</div>
          <div className="border-4 bg-blue-500 w-40 h-10 bg-clip-border p-3">HP Bar</div>
          <div className="border-4 bg-cyan-500 w-40 h-10 bg-clip-border p-3">XP Bar</div>
        </div>
      </div>
      <ProgressBar type="hp" level={level} progress={hp} />
      <ProgressBar type="xp" level={level} progress={xp} />
      <button className="bg-red-100" onClick={changeHp}>Change hp</button>
      <button className="bg-red-100" onClick={changeXp}>Change xp</button>
      <p>Level: {level}</p>
      <button className="bg-red-100" onClick={levelUp}>Increase level</button>
    </div>
  );
};

const Habit = ({habitName, beingEdited, isChecked, onEditClicked, onDeleteClicked, onCheckClicked, onEditName}) => {
  const handleNameChange = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries())

    onEditName(formJson.newName)
    onEditClicked()
  }

  return (
    <div className="flex gap-5">
      <input type="checkbox"
      className='border-gray-400 hover:scale-140 hover:border-black transition-all'
      onClick={onCheckClicked}
      defaultChecked={isChecked}/>

      
      {/* Name/edit box */}
      {!beingEdited ? 
      <p>{habitName}</p> : 
        <form className="flex gap-2" onSubmit={handleNameChange}>
        <input type="text" name="newName" placeholder={habitName} className='border-1 rounded-md w-30' maxLength={30}/>
        <button type="submit" className='border-green-500 border-1 rounded-md scale-100 box-border
                        transition-all hover:border-black hover:scale-125'><TiTick/>
        </button>
        <button className='border-green-500 border-1 rounded-md scale-100 box-border
                        transition-all hover:border-black hover:scale-125'
                        onClick={onEditClicked}><TiTimes/>
        </button>
        </form>
      }

      { /* Edit & Delete Icons */ }
      
      {!beingEdited && 
      <div className='ml-auto flex gap-2 justify-end'>
        <button className='border-green-500 border-1 rounded-md ml-auto box-border transition-all
                      hover:border-black hover:scale-125'
                        onClick={onEditClicked}><TiPencil />
          </button>
        <button className='border-green-500 border-1 rounded-md scale-100 box-border
                          transition-all hover:border-black hover:scale-125'
                          onClick={onDeleteClicked}><TiTrash/>
        </button>
      </div>}
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
