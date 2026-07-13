package com.marcosweb.backend.controller;

import com.marcosweb.backend.entity.EstadoTarea;
import com.marcosweb.backend.entity.Prioridad;
import com.marcosweb.backend.entity.Tarea;
import com.marcosweb.backend.service.TareaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    private final TareaService tareaService;

    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }

    @GetMapping
    public List<Tarea> listar() {
        return tareaService.listar();
    }

    @GetMapping("/{id}")
    public Tarea buscarPorId(@PathVariable Integer id) {
        return tareaService.buscarPorId(id);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Tarea> listarPorUsuario(@PathVariable Integer idUsuario) {
        return tareaService.listarPorUsuario(idUsuario);
    }

    @GetMapping("/estado/{estado}")
    public List<Tarea> listarPorEstado(@PathVariable EstadoTarea estado) {
        return tareaService.listarPorEstado(estado);
    }

    @GetMapping("/prioridad/{prioridad}")
    public List<Tarea> listarPorPrioridad(@PathVariable Prioridad prioridad) {
        return tareaService.listarPorPrioridad(prioridad);
    }

    @PostMapping
    public Tarea guardar(@RequestBody Tarea tarea) {
        return tareaService.guardar(tarea);
    }

    @PutMapping("/{id}")
    public Tarea actualizar(@PathVariable Integer id, @RequestBody Tarea tarea) {
        return tareaService.actualizar(id, tarea);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        tareaService.eliminar(id);
    }
}