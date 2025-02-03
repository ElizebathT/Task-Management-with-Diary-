import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllTaskAPI } from '../services/taskServices';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const Taskchart = () => {
  const { data: tasks, isError, error, isLoading, isPending,isSuccess } = useQuery({
    queryKey: ['get-all-daily-tasks'],
    queryFn: getAllTaskAPI,
  });
  const queryClient=useQueryClient()
  const taskLabels = tasks?.map((task) => task.title);
  if(isSuccess){
    queryClient.invalidateQueries()
}
  const taskData = tasks?.map((task) => {
    const totalTime = task.completed?.reduce((acc, element) => {
      const startTimeParts = element.start_time.split(':');
      const completionTimeParts = element.completion_time.split(':');

      const startDate = new Date();
      startDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0, 0);

      const completionDate = new Date();
      completionDate.setHours(parseInt(completionTimeParts[0]), parseInt(completionTimeParts[1]), 0, 0);
const timeDiff = (completionDate - startDate) / (1000 * 60); 
      return acc + timeDiff;
    }, 0); 

    return totalTime;
  });

  const dynamicColors = taskLabels?.map(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  });

  return (
    <div className="bg-gray-800">
      <Doughnut
        className="relative bg-gray-800 h-1/2 w-1/2 py-5"
        data={{
          labels: taskLabels,
          datasets: [
            {
              label: 'Time spent',
              data: taskData,
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
                },
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
      
      {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
       
       
    </div>
  );
};

export default Taskchart;
