import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm( ) {
    const { todo } = useSelector((state: any) => state.todosReducer);
      const dispatch = useDispatch();
    return (
        <li className="list-group-item">
            <button onClick={() =>  dispatch(addTodo(todo))}
                id="wd-add-todo-click"
            className="btn btn-success float-end me-2"> Add </button>
            <button onClick={() =>  dispatch(updateTodo(todo))}
                id="wd-update-todo-click"
            className="btn btn-warning float-end me-2"> Update </button>
            <input value={todo.title}
                className="form-control w-25"
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
        </li>
    );
}
