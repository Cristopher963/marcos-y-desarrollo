package com.marcosweb.backend.controller;

import com.marcosweb.backend.entity.Recordatorio;
import com.marcosweb.backend.service.RecordatorioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recordatorios")
@CrossOrigin(origins = "*")
public class RecordatorioController {

    private final RecordatorioService recordatorioService;

    public RecordatorioController(RecordatorioService recordatorioService) {
        this.recordatorioService = recordatorioService;
    }

    @GetMapping
    public List<Recordatorio> listar() {
        return recordatorioService.listar();
    }

    @GetMapping("/{id}")
    public Recordatorio buscarPorId(@PathVariable Integer id) {
        return recordatorioService.buscarPorId(id);
    }

    @GetMapping("/tarea/{idTarea}")
    public List<Recordatorio> listarPorTarea(@PathVariable Integer idTarea) {
        return recordatorioService.listarPorTarea(idTarea);
    }

    @PostMapping
    public Recordatorio guardar(@RequestBody Recordatorio recordatorio) {
        return recordatorioService.guardar(recordatorio);
    }

    @PutMapping("/{id}")
    public Recordatorio actualizar(@PathVariable Integer id, @RequestBody Recordatorio recordatorio) {
        return recordatorioService.actualizar(id, recordatorio);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        recordatorioService.eliminar(id);
    }
}