import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  {
    /*
    event.target.value 是指触发事件的元素的当前值
    每当用户在输入框中输入或删除文本时，onChange 事件被触发，event.target.value 将包含当前输入框的值，并将其存储在组件的状态中。
    */
  }
  function handleChange() {
    setName(event.target.value);
  }

  //当用户在子组件中点击按钮时，子组件可以调用父组件传递的回调函数，以便父组件可以更新其状态或执行其他操作。
  function handleSubmit(event) {
    event.preventDefault();
    props.addTask(name); //当点击提交时，调用回调属性（函数），将新任务加到任务列表中
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
