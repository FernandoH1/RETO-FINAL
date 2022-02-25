package com.crud.kataCrud.controller;

import com.crud.kataCrud.model.ListTodo;
import com.crud.kataCrud.model.Todo;
import com.crud.kataCrud.service.ListTodoService;
import com.crud.kataCrud.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/listTodo")
public class ListTodoController {

    @Autowired
    private ListTodoService service;

    @GetMapping()
    public ResponseEntity<List<ListTodo>> allListTodo(){
        try {
            List<ListTodo> list = service.allListTodo();

            if(list.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);


            return new ResponseEntity<>(list, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ListTodo save(@RequestBody ListTodo listTodo){
        return service.save(listTodo);
    }

    @PutMapping()
    public ListTodo update(@RequestBody ListTodo listTodo){
        if(listTodo.getId() != null){
            return service.save(listTodo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

}
