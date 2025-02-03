import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import AddDailyTask from '../components/AddDailyTask'
import Taskchart from '../components/Taskchart'
import DailyTasks from '../components/DailyTasks';
import SearchTask from '../components/SearchTask';


const Tasks = () => {
  // const [showMain, setShowMain] = useState(false);

  //   const handleClick = () => {
  //       setShowMain(!showMain);
  //   };
  return (
    <div>
      {/* <button 
        onClick={handleClick} 
        className="fixed bottom-5 right-5 p-4 bg-yellow-500 rounded-full shadow-lg  focus:outline-none z-50"
      > */}
        {/* <ButtonComponent handleClick={handleClick} /> */}
      {/* </button> */}
           {/* {showMain && <AddDailyTask />} */}
          
      <h3 className="text-2xl text-center text-white p-5 font-bold bg-gray-800">Total time spent on tasks</h3>
      <Taskchart/>
      <SearchTask/> 
      <AddDailyTask/>
           
      <DailyTasks/>
    </div>
  )
}

export default Tasks
