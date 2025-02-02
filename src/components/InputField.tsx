import React, { useRef } from "react";
import "./styles.css";

type Props = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
};

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name=""
        id=""
        className="input__box"
        placeholder="Enter a Expense"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit">Go</button>
    </form>
  );
};

export default InputField;
