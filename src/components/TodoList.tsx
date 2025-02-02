import React, { useState } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

import "./styles.css";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

// Helper function to format numbers with commas
const formatNumberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const totalPending = todos.reduce((acc, todo) => {
    if (!todo.isDone) {
      return acc + Number(todo.todo.split(" ")?.[0]);
    }
    return acc;
  }, 0);

  const totalCompleted = todos.reduce((acc, todo) => {
    if (todo.isDone) {
      return acc + Number(todo.todo.split(" ")?.[0]);
    }
    return acc;
  }, 0);

  const totalBudget = 180000;
  const totalCombined = totalPending + totalCompleted;
  const remainingBudget = (() =>{
    if(totalBudget > totalCombined){
      return totalBudget - totalCombined;
    }
    return 0;
  })();
  const loan = (() => {
    if (totalBudget < totalCombined) {
      return totalCombined - totalBudget;
    } else {
      return 0;
    }
  })();

  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Pending Expense</span>
        {todos.map((todo) => {
          if (!todo.isDone)
            return (
              <SingleTodo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            );
        })}

        <h2 className="todos__heading">Total: {formatNumberWithCommas(totalPending)}</h2>
      </div>
      <div className="todos remove">
        <span className="todos__heading">Completed Expense</span>
        {todos.map((todo) => {
          if (todo.isDone)
            return (
              <SingleTodo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            );
        })}
        <h2 className="todos__heading">Total: {formatNumberWithCommas(totalCompleted)}</h2>
      </div>
      <div className="todos combine">
        <h2 className="todos__heading">Expense Total: {formatNumberWithCommas(totalCombined)}</h2>
      </div>
      <div className="todos combine">
        <h2 className="todos__heading">Total Budget: {formatNumberWithCommas(totalBudget)}</h2>
      </div>
      <div className="todos combine">
        <h2 className="todos__heading">Budget Remaining: {formatNumberWithCommas(remainingBudget)}</h2>
      </div>
      <div className="todos combine">
        <h2 className="todos__heading">Loan: {formatNumberWithCommas(loan)}</h2>
      </div>
    </div>
  );
};

export default TodoList;