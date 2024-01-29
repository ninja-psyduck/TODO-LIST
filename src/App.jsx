import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  //Hook
  const [tasks, setTasks] = useState(props.tasks);

  // 通过props传过来的对象数组生成一一个新的数组
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
  ));

  // 放在 taskList 后面否则无法获取到数组的长度
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  //addTask() 是一个callback prop
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]); // 展开运算符（spread operator），通过hook更新任务列表
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* <Todo name="Eat" completed={true} id="todo-0"/>
       <Todo name="Sleep" completed={false} id="todo-1"/>
       {/*将 true 视为 JavaScript 表达式，而不是字符串。*/}
        {/* <Todo name="Repeat" completed={false} id="todo-2" /> */}
        {/* 通过prop传入数据，类似于传参  */}
      </ul>
    </div>
  );
}

export default App;
