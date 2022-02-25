package com.crud.kataCrud.model;

import java.io.Serializable;

public class Data implements Serializable {

    private Long id;
    private String name;
    private boolean isCompleted;
    private long idListTodo;
    private String nameListTodo;

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

    public long getListodo() {
        return idListTodo;
    }

    public void setListodo(long listodo) {
        this.idListTodo = listodo;
    }

    public long getIdListTodo() {
        return idListTodo;
    }

    public void setIdListTodo(long idListTodo) {
        this.idListTodo = idListTodo;
    }

    public String getNameListTodo() {
        return nameListTodo;
    }

    public void setNameListTodo(String nameListTodo) {
        this.nameListTodo = nameListTodo;
    }
}
