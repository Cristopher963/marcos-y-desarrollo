package com.marcosweb.backend.service;

import com.marcosweb.backend.entity.EstadoTarea;
import com.marcosweb.backend.entity.Prioridad;
import com.marcosweb.backend.entity.Tarea;
import com.marcosweb.backend.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TareaService {

    private final TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    public List<Tarea> listar() {
        return tareaRepository.findAll();
    }

    public Tarea buscarPorId(Integer id) {
        return tareaRepository.findById(id).orElse(null);
    }

    public List<Tarea> listarPorUsuario(Integer idUsuario) {
        return tareaRepository.findByUsuarioIdUsuario(idUsuario);
    }

    public List<Tarea> listarPorEstado(EstadoTarea estado) {
        return tareaRepository.findByEstado(estado);
    }

    public List<Tarea> listarPorPrioridad(Prioridad prioridad) {
        return tareaRepository.findByPrioridad(prioridad);
    }

    public Tarea guardar(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    public Tarea actualizar(Integer id, Tarea tarea) {
        Tarea existente = buscarPorId(id);

        if (existente == null) {
            return null;
        }

        existente.setTitulo(tarea.getTitulo());
        existente.setDescripcion(tarea.getDescripcion());
        existente.setEstado(tarea.getEstado());
        existente.setPrioridad(tarea.getPrioridad());
        existente.setFechaLimite(tarea.getFechaLimite());
        existente.setUsuario(tarea.getUsuario());

        return tareaRepository.save(existente);
    }

    public void eliminar(Integer id) {
        tareaRepository.deleteById(id);
    }
}