import React, { useEffect, useState } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

import "./styles.css";
import { AiFillEdit } from "react-icons/ai";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const formatNumberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [budget, setBudget] = useState<number>(240000);
  const [isEditing, setIsEditing] = useState<boolean>(false); // State for editing mode
  const [newBudget, setNewBudget] = useState<number>(budget); // State for new budget input
  const [totalMoney, setTotalMoney] = useState<number>(2649887);
  const [isEditingTotalMoney, setIsEditingTotalMoney] = useState<boolean>(false); // State for editing mode
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

  const totalCombined = totalPending + totalCompleted;
  const remainingBudget = (() => {
    if (budget > totalCombined) {
      return budget - totalCombined;
    }
    return 0;
  })();
  const loan = (() => {
    if (budget < totalCombined) {
      return totalCombined - budget;
    } else {
      return 0;
    }
  })();

  const handleEditClick = () => {
    if (isEditing) {
      // Update budget and switch to display mode
      setBudget(newBudget);
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleTotalMoneyEditClick = () => {
    if (isEditingTotalMoney) {
      // Update budget and switch to display mode
      setTotalMoney(totalMoney);
    }
    setIsEditingTotalMoney(!isEditingTotalMoney); // Toggle edit mode
  }
useEffect(() => {
  if(loan > 0) {
    setTotalMoney(totalMoney - loan);
  }
}, [loan]);
 

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
        <h2 className="todos__heading">
          Total: {formatNumberWithCommas(totalPending)}
        </h2>
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
        <h2 className="todos__heading">
          Total: {formatNumberWithCommas(totalCompleted)}
        </h2>
      </div>

      <div className="todos combine">
        <h2 className="todos__heading">
          Expense Total: {formatNumberWithCommas(totalCombined)}
        </h2>
      </div>

      <div className="todos combine">
        {isEditing ? (
          <div className="todo-container">
            <input
              className="todos__single--text"
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(Number(e.target.value))}
              onBlur={handleEditClick} // Update when the input loses focus
            />
            <button className="elegant-button" onClick={handleEditClick}>
              Update
            </button>
          </div>
        ) : (
      
            <h2 className="todos__heading">
              Total Budget: {formatNumberWithCommas(budget)}{" "}
              <AiFillEdit style={{background: "yellow", padding: "4px", borderRadius: "5px"}} onClick={handleEditClick} className="icon" />
            </h2>
     
        )}
      </div>

      <div className="todos combine">
        <h2 className="todos__heading">
          Budget Remaining: {formatNumberWithCommas(remainingBudget)}
        </h2>
      </div>

      <div className="todos combine">
        <h2 className="todos__heading">Loan: {formatNumberWithCommas(loan)}</h2>
      </div>

      <div className="todos combine">
        {isEditingTotalMoney ? (
          <div className="todo-container">
            <input
              className="todos__single--text"
              type="number"
              value={totalMoney}
              onChange={(e) => setTotalMoney(Number(e.target.value))}
              onBlur={handleTotalMoneyEditClick} // Update when the input loses focus
            />
            <button className="elegant-button" onClick={handleEditClick}>
              Update
            </button>
          </div>
        ) : (
      
            <h2 className="todos__heading">
              Total Money: {formatNumberWithCommas(totalMoney)}{" "}
              <AiFillEdit style={{background: "yellow", padding: "4px", borderRadius: "5px"}} onClick={handleTotalMoneyEditClick} className="icon" />
            </h2>
     
        )}
      </div>

    </div>
  );
};

export default TodoList;
