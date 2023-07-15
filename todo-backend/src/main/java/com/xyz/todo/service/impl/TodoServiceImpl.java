package com.xyz.todo.service.impl;

import com.xyz.todo.dto.TodoDto;
import com.xyz.todo.entity.Todo;
import com.xyz.todo.mapper.EntityMapper;
import com.xyz.todo.repository.TodoRepository;
import com.xyz.todo.service.TodoService;
import com.xyz.todo.service.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;
    private EntityMapper entityMapper;
    @Override
    public TodoDto createTodo(TodoDto todoDto) {
        var todo = entityMapper.modelMapper().map(todoDto, Todo.class);
        return entityMapper.modelMapper().map(todoRepository.save(todo), TodoDto.class);
    }

    @Override
    public List<TodoDto> retrieveAllTodos() {
        return todoRepository
                .findAll()
                .stream()
                .map(
                        todo -> entityMapper.modelMapper().map(todo, TodoDto.class)
                )
                .collect(Collectors.toList());
    }
    @Override
    public TodoDto retrieveTodoById(Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        return entityMapper.modelMapper().map(todo, TodoDto.class);
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        return entityMapper.modelMapper().map(todoRepository.save(todo), TodoDto.class);
    }

    @Override
    public void deleteTodoById(Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        todoRepository.delete(todo);
    }

    @Override
    public TodoDto completedTodo(Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        todo.setCompleted(Boolean.TRUE);
        return entityMapper.modelMapper().map(todoRepository.save(todo), TodoDto.class);
    }

    @Override
    public TodoDto inCompletedTodo(Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        todo.setCompleted(Boolean.FALSE);
        return entityMapper.modelMapper().map(todoRepository.save(todo), TodoDto.class);
    }
}
