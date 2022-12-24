import React, { useState, useEffect } from "react";

function Timeline() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Retrieve the list of tasks from a data source
    // You can replace this with a function that returns a hardcoded list of tasks
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  // Calculate the start position of a task within the timeline based on its deadline and duration
  const calculateTaskStart = (deadline, duration) => {
    // Calculate the number of days between the current date and the deadline
    const daysUntilDeadline =
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
    // Calculate the start position based on the number of days and the duration (in days) of the task
    const start = daysUntilDeadline - duration;
    // Convert the start position to pixels (assuming a timeline width of 1000px and a task width of 200px)
    return start * (1000 / 200);
  };

  // Filter the tasks based on the selected time frame (month, week, or day)
  const filterTasks = (timeFrame) => {
    // Calculate the current date
    const now = new Date();
    // Set the start and end dates for the selected time frame
    let startDate, endDate;
    if (timeFrame === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (timeFrame === "week") {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      );
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() + 6
      );
    } else if (timeFrame === "day") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    }
    // Filter the tasks based on the start and end dates
    const filteredTasks = tasks.filter((task) => {
      const deadline = new Date(task.deadline);
      return deadline >= startDate && deadline <= endDate;
    });
    // Update the state with the filtered tasks
    setTasks(filteredTasks);
  };

  return (
    <div>
      <div id="timeline">
        {tasks.map((task) => (
          <div
            className="task"
            key={task.id}
            onClick={() => filterTasks(task.timeFrame)}
          >
            {/* Task content goes here */}
            <h3>{task.name}</h3>
            <p>Deadline: {task.deadline}</p>
            {/* Calculate the task's position within the timeline based on its deadline and duration */}
            <style>{`
              .task {
                position: absolute;
                left: ${calculateTaskStart(task.deadline, task.duration)}px;
                top: ${calculateTaskStart(task.deadline, task.duration)}px;
                width: 200px;
                height: 50px;
                background-color: #fff;
                border: 1px solid #ccc;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
                border-radius: 5px;
                padding: 10px;
              }
            `}</style>
          </div>
        ))}
      </div>

      {/* Month, week, day filters */}
      <div id="filters">
        <button id="month" onClick={() => filterTasks("month")}>
          Month
        </button>
        <button id="week" onClick={() => filterTasks("week")}>
          Week
        </button>
        <button id="day" onClick={() => filterTasks("day")}>
          Day
        </button>
      </div>
    </div>
  );
}

export default Timeline;
