import React, { useContext, useRef, useState } from 'react';
import {Store} from './StoreProvider'; 
const HOST_API = "http://localhost:8080/api";

const FormListTodo = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
    //console.log(todo.list)
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
      };
  
      fetch(HOST_API + "/listTodo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((listTodo) => {
          dispatch({ type: "add-item", item: listTodo });
          console.log(todo.list);
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    return <form ref={formRef} className="form-inline">
      <div className="container">
      <input className="form-control mb-2"
        type="text"
        name="name"
        placeholder="Ingresar nombre de la Lista"
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input>

        <button className='btn btn-success mb-2' onClick={onAdd}>Crear Lista</button>
      
        </div>
      
    </form>
  }

  
  export default FormListTodo;