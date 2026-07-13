package com.marcosweb.backend.service;

import com.marcosweb.backend.entity.Subtarea;
import com.marcosweb.backend.repository.SubtareaRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class SubtareaService {

    private final SubtareaRepository subtareaRepository;

    public SubtareaService(SubtareaRepository subtareaRepository) {
        this.subtareaRepository = subtareaRepository;
    }

    public List<Subtarea> listar() {
        return subtareaRepository.findAll();
    }

    public Subtarea buscarPorId(Integer id) {
        return subtareaRepository.findById(id).orElse(null);
    }

    public List<Subtarea> listarPorTarea(Integer idTarea) {
        return subtareaRepository.findByTareaIdTarea(idTarea);
    }

    public Subtarea guardar(Subtarea subtarea) {
        return subtareaRepository.save(subtarea);
    }

    public Subtarea actualizar(Integer id, Subtarea subtarea) {
        Subtarea existente = buscarPorId(id);

        if (existente == null) {
            return null;
        }

        existente.setTitulo(subtarea.getTitulo());
        existente.setCompletada(subtarea.getCompletada());
        existente.setTarea(subtarea.getTarea());

        return subtareaRepository.save(existente);
    }

    public void eliminar(Integer id) {
        subtareaRepository.deleteById(id);
    }
}