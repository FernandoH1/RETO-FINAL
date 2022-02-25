package com.crud.kataCrud.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;


@Entity
public class Todo implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private boolean isCompleted;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "list_todo_id")
    private ListTodo listTodo;

    public Todo() {
    }

    public Todo(Data data) {
        this.id = data.getId();
        this.name = data.getName();
        this.isCompleted = data.isCompleted();
        ListTodo listTodo = new ListTodo();
        listTodo.setId(data.getIdListTodo());
        listTodo.setName(data.getNameListTodo());
        this.listTodo = listTodo;
    }

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

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public ListTodo getListTodo() {
        return listTodo;
    }

    public void setListTodo(ListTodo listTodo) {
        this.listTodo = listTodo;
    }
}
