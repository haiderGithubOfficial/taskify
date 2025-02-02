import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the dialog component

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to manage dialog visibility

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = () => {
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  const confirmDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove the todo
    setIsDialogOpen(false); // Close the dialog after deletion
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <>
      <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input
            ref={inputRef}
            type="text"
            className="todos__single--text"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )}

        <div>
          {todo.isDone ? (
            ""
          ) : (
            <span className="icon">
              <AiFillEdit onClick={() => setEdit(!edit)} />
            </span>
          )}

          <span className="icon">
            <AiFillDelete onClick={handleDelete} />
          </span>
          {todo.isDone ? (
            <span className="icon">
              <RxCross2 onClick={() => handleDone(todo.id)} />
            </span>
          ) : (
            <span className="icon">
              <MdDone onClick={() => handleDone(todo.id)} />
            </span>
          )}
        </div>
      </form>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => confirmDelete(todo.id)}
      />
    </>
  );
};

export default SingleTodo;