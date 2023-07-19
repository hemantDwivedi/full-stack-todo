package com.xyz.todo.controller;

import com.xyz.todo.dto.TodoDto;
import com.xyz.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
@AllArgsConstructor
public class TodoController {
    private TodoService todoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto todoDto){
        return new ResponseEntity<>(todoService.createTodo(todoDto), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public ResponseEntity<List<TodoDto>> retrieveAllTodos(){
        return ResponseEntity.ok(todoService.retrieveAllTodos());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> retrieveTodoById(@PathVariable Long id){
        return ResponseEntity.ok(todoService.retrieveTodoById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @RequestBody TodoDto todoDto){
        return ResponseEntity.ok(todoService.updateTodo(todoDto, id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodoById(@PathVariable Long id){
        todoService.deleteTodoById(id);
        return ResponseEntity.ok("Todo deleted with id:" + id);
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("/{id}/completed")
    public ResponseEntity<TodoDto> completedTodo(@PathVariable Long id){
        return ResponseEntity.ok(todoService.completedTodo(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("/{id}/uncompleted")
    public ResponseEntity<TodoDto> inCompletedTodo(@PathVariable Long id){
        return ResponseEntity.ok(todoService.inCompletedTodo(id));
    }
}
