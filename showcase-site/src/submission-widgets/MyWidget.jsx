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
    <div className="p-6 mx-auto bg-white rounded-xl w-100 shadow-lg">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Habit Tracker</h2>

        <div className="justify-center bg-white">
          <div>
          <ul>
            {/* {habits.map((habit, index) => 
            <Habit key={index} beingEdited={editingHabitIndex === index} habitName={habit.name} checked={habit.checked}
            onCheckClicked={() => checkHabit(index)}
            onEditClicked={() => setEditingHabitIndex({index})}/>)}*/ }
          </ul>
          </div>
        </div>
      </div>
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

export default MyWidget;
