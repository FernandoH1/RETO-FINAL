import React, { useContext, useEffect, useState, useRef } from 'react';
import { Store } from './StoreProvider';
const HOST_API = "http://localhost:8080/api";


const ListTodo = (props) => {
    const [todoUpdate, setTodoUpdate] = useState("");
    const { dispatch, state: { todo } } = useContext(Store);
    const [dataTodo, setDataTodo] = useState("");
    const [update, setUpdate] = useState(props.listTodo);

    const onDelete = (id) => {
        fetch(HOST_API + "/listTodo/" + id, {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };

    const refresh = () => {
        fetch(HOST_API + "/listTodo")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
                let filtrar = list.filter(function (elemento) {
                    return elemento.id == update.id
                })[0];
                setUpdate(filtrar)
            })
    }

    const changeDataListTodo = (event) => {
        setDataTodo({ ...dataTodo, name: event.target.value });
    }

    const onCreateTodo = (event) => {

        if (botonCrear.current.innerHTML == "actualizar") {
            let t = todoUpdate;
            t.name = inputCrear.current.value;

            fetch(HOST_API + "/todo", {
                method: "PUT",
                body: JSON.stringify(t),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todo) => {
                    dispatch({ type: "update-item", item: todo });
                    botonCrear.current.innerHTML = "Crear";
                    refresh();
                });

        } else {
            event.preventDefault();

            const request = {
                name: dataTodo.name,
                id: null,
                completed: false,
                idListTodo: update.id,
                nameListTodo: update.name
            };

            fetch(HOST_API + "/todo", {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todo) => {
                    setDataTodo({ name: "" });
                    let algo = update.listTodo;
                    algo.push(todo);
                    setDataTodo({ ...update, algo });
                });
        }
    }

    const onDeleteTodo = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            refresh();
        })
    };

    const onEditTodo = (todo, idListTodos, nameListTodos) => {
        inputCrear.current.focus();
        botonCrear.current.innerHTML = "actualizar";

        const request = {
            name: inputCrear.current.value,
            id: todo.id,
            completed: todo.completed,
            idListTodo: idListTodos,
            nameListTodo: nameListTodos
        };

        setTodoUpdate(request);

    };

    const onChangeTodo = (event, todo, idListTodos, nameListTodos) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked,
            idListTodo: idListTodos,
            nameListTodo: nameListTodos
        };


        
        if (event.target.checked) {
            document.getElementById(todo.id).disabled = true;
        } else {
            document.getElementById(todo.id).disabled = false;
        }

        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
            });
    };

    
    const inputCrear = useRef();
    const botonCrear = useRef();


    return (<div className='container aplicarBorde'>
        <div className='alineaccion'>
            <h3>{update.name}</h3><button className='btn btn-danger m-2' onClick={() => onDelete(update.id)}>Eliminar</button>
        </div>
        <div className='alineaccion'>
            <input type="text" class="form-control mb-2"
                name="name"
                placeholder="Ingresar el To-Do"
                onChange={(event) => changeDataListTodo(event)
                }
                ref={inputCrear}
            >
            </input>
            <button onClick={(event) => onCreateTodo(event)}
                ref={botonCrear}
                className='btn btn-success m-2'>Crear</button>
        </div>
        <table className="table table-striped table-secondary">
            <thead>
                <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Completado?</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            {update.listTodo.map((todo, index) => {
                return <> <tbody><tr key={todo.id}></tr>
                    <tr>
                        <th scope="row">{todo.id}</th>
                        <th scope="row">{todo.name}</th>
                      
                        <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChangeTodo(event, update.listTodo[index], update.id, update.name)}></input></td>
                        <td><button className='btn btn-danger m-2' onClick={() => onDeleteTodo(todo.id)}>Eliminar</button>
                            <button className='btn btn-primary' id={todo.id} onClick={() => onEditTodo(update.listTodo[index], update.id, update.name)}>Editar</button></td>
                        
                    </tr></tbody></>
            })}
        </table>
    </div>);
}

const ShowListTodo = () => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    useEffect(() => {
        console.log("holaa");
        fetch(HOST_API + "/listTodo")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    }, [dispatch]);

    const decorationDone = {
        textDecoration: 'line-through'
    };


    return <div>
        {currentList.map((todo) => {
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                <ListTodo
                    listTodo={todo}
                />
            </tr>
        })}
    </div>

}
export default ShowListTodo;