import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";
// 页面从上到下依次是：表单（Form）、筛选器（FilterButton）、任务列表（对象数组）,包含多个Todo(对象)
// 这个对象的值是用来筛选任务的函数
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

// 创建一个常量 FILTER_NAMES，其值是 FILTER_MAP 对象的所有键组成的数组
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  //Hook
  const [tasks, setTasks] = useState(props.tasks); //用来更新任务列表（对象数组）
  const [filter, setFilter] = useState("All"); //筛选器的初始值是All

  //callback prop for <Todo/>
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // 当传入的参数与对象数组里某个对象的id相同时，这个对象的completed属性取反并返回这个对象
        //这里展开运算符用在对象上
        return { ...task, completed: !task.completed };
      }
      return task; //如果不相同，返回原来的对象
    });
    setTasks(updatedTasks); //更新任务列表
  }
  //callback prop for <Todo/> 删除任务的函数（prop, 回调属性，回调函数）
  function deleteTask(id) {
    //通过filter()函数把符合的条件的对象保留下来，然后更新列表（对象数组）
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  //callback prop for <Todo/> 编辑任务的函数（prop, 回调属性，回调函数）
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
        //不管是要更改对象的哪个属性，写在最后就行
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // 通过props传过来的对象数组生成一一个新的数组
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
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
      {/* 将回调属性传给子组件 */}
      <div className="filters btn-group stack-exception">
        {filterList}
        {/* 通过对象数组多次使用子组件，并把所有props传给子组件 */}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* 通过对象数组多次使用子组件，并把所有props传给子组件 */}
      </ul>
    </div>
  );
}

export default App;
