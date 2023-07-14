package com.xyz.todo.service;

import com.xyz.todo.dto.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto createTodo(TodoDto todoDto);
    List<TodoDto> retrieveAllTodos();
    TodoDto retrieveTodoById(Long id);

    TodoDto updateTodo(TodoDto todoDto, Long id);

    void deleteTodoById(Long id);

    TodoDto completedTodo(Long id);

    TodoDto inCompletedTodo(Long id);
}
