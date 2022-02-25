package com.crud.kataCrud.service;

import com.crud.kataCrud.model.ListTodo;
import com.crud.kataCrud.repository.ListTodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ListTodoService {
    @Autowired
    private ListTodoRepository listTodoRepository;

    public ArrayList<ListTodo> allListTodo(){
        return (ArrayList<ListTodo>) listTodoRepository.findAll();
    }

    public ListTodo save(ListTodo listTodo){
        return listTodoRepository.save(listTodo);
    }

    public void delete(Long id){
        listTodoRepository.delete(get(id));
    }

    public ListTodo get(Long id){
        return listTodoRepository.findById(id).orElseThrow();
    }
}
