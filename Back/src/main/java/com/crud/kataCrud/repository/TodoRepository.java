package com.crud.kataCrud.repository;

import com.crud.kataCrud.model.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {


}
