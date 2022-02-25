package com.crud.kataCrud.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.OneToMany;


@Entity
public class ListTodo implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "listTodo")
    private List<Todo> listTodo = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Todo> getListTodo() {
        return listTodo;
    }

    public void setListTodo(List<Todo> listTodo) {
        this.listTodo = listTodo;
    }
}

