package com.crud.kataCrud.controller;

import com.crud.kataCrud.model.ListTodo;
import com.crud.kataCrud.model.Data;
import com.crud.kataCrud.model.Todo;
import com.crud.kataCrud.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value ="api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }

    @PostMapping(value ="api/todo")
    public Todo save(@RequestBody Data data){
        return service.save(new Todo(data));
    }

    @PutMapping(value ="api/todo")
    public Todo update(@RequestBody Data data){
        if(data.getId() != null){
            return service.save(new Todo(data));
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/get")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @GetMapping(value = "api/{list_todo_id}")
    public Todo getTodo(@PathVariable("list_todo_id") Long id){
        return service.get(id);
    }

}
