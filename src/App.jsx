import React from 'react';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from './components/Todo';

function App(props) {
  const taskList = props.tasks.map((task) => (<Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />));
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
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


export default App
