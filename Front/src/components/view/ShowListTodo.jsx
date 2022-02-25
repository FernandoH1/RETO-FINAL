import React, { useContext, useEffect, useState, useRef } from 'react';
import { Store } from './StoreProvider';
const HOST_API = "http://localhost:8080/api";


const ListTodo = (props) => {
    const [todoUpdate, setTodoUpdate] = useState("");
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const currentList = todo.list;
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
                console.log(update);

                console.log(filtrar);
                //console.log(list);
            })
    }


    const changeDataListTodo = (event) => {
        setDataTodo({ ...dataTodo, name: event.target.value });
    }

    const onCreateTodo = (event) => {

        if (botonCrear.current.innerHTML == "actualizar") {
            let t = todoUpdate;
            t.name = inputCrear.current.value;
            console.log("ENTRO EN EL IF");

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
            console.log("ENTRO EN EL ELSE");
            event.preventDefault();

            const request = {
                name: dataTodo.name,
                id: null,
                completed: false,
                idListTodo: update.id,
                nameListTodo: update.name
            };
            console.log(request);

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
                    console.log(todo);
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

        console.log(todo.name)
        if (event.target.checked) {
            botonEditar.current.disabled = true;
        } else {
            botonEditar.current.disabled = false;
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

    const botonEditar = useRef();
    const inputCrear = useRef();
    const botonCrear = useRef();

    const fueraDeFoco = () => {
        botonCrear.current.innerHTML = "Crear";
    }

    return (<div className='container aplicarBorde'>
        <div className='alineaccion'>
            <h3>{update.name}</h3><button className='btn btn-primary m-2' onClick={() => onDelete(update.id)}>Eliminar</button>
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
                className='btn btn-primary m-2'>Crear</button>
        </div>
        <table>
            <tr>
                <td>ID</td>
                <td>Tarea</td>
                <td>¿Completado?</td>
            </tr>
            {update.listTodo.map((todo, index) => {
                return <><tr key={todo.id}>
                </tr><tr>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChangeTodo(event, update.listTodo[index], update.id, update.name)}></input></td>
                        <td><button className='btn btn-primary m-2' onClick={() => onDeleteTodo(todo.id)}>Eliminar</button>
                            <button className='btn btn-primary' ref={botonEditar} onClick={() => onEditTodo(update.listTodo[index], update.id, update.name)}>Editar</button></td>
                    </tr></>
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
                console.log(list);
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