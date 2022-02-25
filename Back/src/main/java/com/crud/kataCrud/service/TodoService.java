package com.crud.kataCrud.service;

import com.crud.kataCrud.model.ListTodo;
import com.crud.kataCrud.model.Todo;
import com.crud.kataCrud.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public Iterable<Todo> list(){
        return todoRepository.findAll();
    }

    public Todo save(Todo todo){
        return todoRepository.save(todo);
    }

    public void delete(Long id){
        todoRepository.delete(get(id));
    }

    public Todo get(Long id){
       return todoRepository.findById(id).orElseThrow();
    }
}
