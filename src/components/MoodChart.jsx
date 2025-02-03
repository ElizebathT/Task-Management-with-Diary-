import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

const MoodChart = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const queryClient=useQueryClient()
    const timeData = [2, 4, 6]; 
    const {data:tasks,isError,error,isLoading,isPending,isSuccess} = useQuery({
      queryKey:["get-all-daily-tasks"],
      queryFn:getAllTaskAPI
  })
  if(isSuccess){
    queryClient.invalidateQueries()
}
  const taskLabels=tasks?.map((task) => (task.title))
  const taskData = tasks?.map((task) => 
    task.completed?.map((element) => 
      (new Date(element.completion_time) - new Date(element.start_time)) / (1000 * 60) 
    )
  );
  
  const dynamicColors = taskLabels?.map(() => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`; 
});
  return (
    <div className='bg-gray-800'>

     <Doughnut className='relative bg-gray-800 h-1/2 w-1/2 py-5'
      data={{
        labels:taskLabels,
        datasets:[
            {
                label:"Time spent",
                data:taskData,
                backgroundColor: dynamicColors,
            },
        ],
      }}
      options={{
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 20,        
              },
              color: 'white',   
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' minutes';
              }
            }
          }
        },
        maintainAspectRatio: false,
      }}
      />      
      
      {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
       
      </div>
  )
}

export default MoodChart
