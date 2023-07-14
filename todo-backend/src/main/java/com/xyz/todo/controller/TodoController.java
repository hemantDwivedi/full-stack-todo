package com.xyz.todo.controller;

import com.xyz.todo.dto.TodoDto;
import com.xyz.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
@AllArgsConstructor
public class TodoController {
    private TodoService todoService;
    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto todoDto){
        return new ResponseEntity<>(todoService.createTodo(todoDto), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<TodoDto>> retrieveAllTodos(){
        return ResponseEntity.ok(todoService.retrieveAllTodos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> retrieveTodoById(@PathVariable Long id){
        return ResponseEntity.ok(todoService.retrieveTodoById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @RequestBody TodoDto todoDto){
        return ResponseEntity.ok(todoService.updateTodo(todoDto, id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodoById(@PathVariable Long id){
        todoService.deleteTodoById(id);
        return ResponseEntity.ok("Todo deleted with id:" + id);
    }
    @PatchMapping("/{id}/completed")
    public ResponseEntity<TodoDto> completedTodo(@PathVariable Long id){
        return ResponseEntity.ok(todoService.completedTodo(id));
    }
    @PatchMapping("/{id}/uncompleted")
    public ResponseEntity<TodoDto> inCompletedTodo(@PathVariable Long id){
        return ResponseEntity.ok(todoService.inCompletedTodo(id));
    }
}
