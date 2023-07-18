package com.xyz.todo.service.impl;

import com.xyz.todo.dto.TodoDto;
import com.xyz.todo.entity.Todo;
import com.xyz.todo.repository.TodoRepository;
import com.xyz.todo.service.TodoService;
import com.xyz.todo.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;
    private ModelMapper modelMapper;
    @Override
    public TodoDto createTodo(TodoDto todoDto) {
        var todo = modelMapper.map(todoDto, Todo.class);
        return modelMapper.map(todoRepository.save(todo), TodoDto.class);
    }

    @Override
    public List<TodoDto> retrieveAllTodos() {
        return todoRepository
                .findAll()
                .stream()
                .map(
                        todo -> modelMapper.map(todo, TodoDto.class)
                )
                .collect(Collectors.toList());
    }
    @Override
    public TodoDto retrieveTodoById(Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        return modelMapper.map(todoRepository.save(todo), TodoDto.class);
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
        return modelMapper.map(todoRepository.save(todo), TodoDto.class);
    }

    @Override
    public TodoDto inCompletedTodo(Long id) {
        var todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id:" + id));
        todo.setCompleted(Boolean.FALSE);
        return modelMapper.map(todoRepository.save(todo), TodoDto.class);
    }
}
