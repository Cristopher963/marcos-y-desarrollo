package com.marcosweb.backend.controller;

import com.marcosweb.backend.entity.Subtarea;
import com.marcosweb.backend.service.SubtareaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/subtareas")
@CrossOrigin(origins = "*")
public class SubtareaController {

    private final SubtareaService subtareaService;

    public SubtareaController(SubtareaService subtareaService) {
        this.subtareaService = subtareaService;
    }

    @GetMapping
    public List<Subtarea> listar() {
        return subtareaService.listar();
    }

    @GetMapping("/{id}")
    public Subtarea buscarPorId(@PathVariable Integer id) {
        return subtareaService.buscarPorId(id);
    }

    @GetMapping("/tarea/{idTarea}")
    public List<Subtarea> listarPorTarea(@PathVariable Integer idTarea) {
        return subtareaService.listarPorTarea(idTarea);
    }

    @PostMapping
    public Subtarea guardar(@RequestBody Subtarea subtarea) {
        return subtareaService.guardar(subtarea);
    }

    @PutMapping("/{id}")
    public Subtarea actualizar(@PathVariable Integer id, @RequestBody Subtarea subtarea) {
        return subtareaService.actualizar(id, subtarea);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        subtareaService.eliminar(id);
    }
}