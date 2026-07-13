package com.marcosweb.backend.service;

import com.marcosweb.backend.entity.Recordatorio;
import com.marcosweb.backend.repository.RecordatorioRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class RecordatorioService {

    private final RecordatorioRepository recordatorioRepository;

    public RecordatorioService(RecordatorioRepository recordatorioRepository) {
        this.recordatorioRepository = recordatorioRepository;
    }

    public List<Recordatorio> listar() {
        return recordatorioRepository.findAll();
    }

    public Recordatorio buscarPorId(Integer id) {
        return recordatorioRepository.findById(id).orElse(null);
    }

    public List<Recordatorio> listarPorTarea(Integer idTarea) {
        return recordatorioRepository.findByTareaIdTarea(idTarea);
    }

    public Recordatorio guardar(Recordatorio recordatorio) {
        return recordatorioRepository.save(recordatorio);
    }

    public Recordatorio actualizar(Integer id, Recordatorio recordatorio) {
        Recordatorio existente = buscarPorId(id);

        if (existente == null) {
            return null;
        }

        existente.setFechaHora(recordatorio.getFechaHora());
        existente.setEnviado(recordatorio.getEnviado());
        existente.setTarea(recordatorio.getTarea());

        return recordatorioRepository.save(existente);
    }

    public void eliminar(Integer id) {
        recordatorioRepository.deleteById(id);
    }
}