package com.marcosweb.backend.service;

import com.marcosweb.backend.entity.EstadoTarea;
import com.marcosweb.backend.entity.Prioridad;
import com.marcosweb.backend.entity.Tarea;
import com.marcosweb.backend.entity.Categoria;
import com.marcosweb.backend.repository.TareaRepository;
import com.marcosweb.backend.repository.CategoriaRepository;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TareaService {

    private final TareaRepository tareaRepository;
    private final CategoriaRepository categoriaRepository;

    public TareaService(TareaRepository tareaRepository, CategoriaRepository categoriaRepository) {
        this.tareaRepository = tareaRepository;
        this.categoriaRepository = categoriaRepository;
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
        if (tarea.getCategorias() != null && !tarea.getCategorias().isEmpty()) {
            List<com.marcosweb.backend.entity.Categoria> categoriasResueltas = new ArrayList<>();
            for (com.marcosweb.backend.entity.Categoria cat : tarea.getCategorias()) {
                categoriaRepository.findById(cat.getIdCategoria())
                .ifPresent(categoriasResueltas::add);
            }
            tarea.setCategorias(categoriasResueltas);
        }
        return tareaRepository.save(tarea);
    }

    public Tarea actualizar(Integer id, Tarea tarea) {
        Tarea existente = buscarPorId(id);

        if (existente == null) return null;

        existente.setTitulo(tarea.getTitulo());
        existente.setDescripcion(tarea.getDescripcion());
        existente.setEstado(tarea.getEstado());
        existente.setPrioridad(tarea.getPrioridad());
        existente.setFechaLimite(tarea.getFechaLimite());
        existente.setUsuario(tarea.getUsuario());

        if (tarea.getCategorias() != null) {
            List<com.marcosweb.backend.entity.Categoria> categoriasResueltas = new ArrayList<>();
            for (com.marcosweb.backend.entity.Categoria cat : tarea.getCategorias()) {
                categoriaRepository.findById(cat.getIdCategoria())
                .ifPresent(categoriasResueltas::add);
            }
            existente.setCategorias(categoriasResueltas);
        }
        return tareaRepository.save(existente);
    }

    public void eliminar(Integer id) {
        tareaRepository.deleteById(id);
    }
}