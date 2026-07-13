package com.marcosweb.backend.repository;

import com.marcosweb.backend.entity.EstadoTarea;
import com.marcosweb.backend.entity.Prioridad;
import com.marcosweb.backend.entity.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
    List<Tarea> findByUsuarioIdUsuario(Integer idUsuario);
    List<Tarea> findByEstado(EstadoTarea estado);
    List<Tarea> findByPrioridad(Prioridad prioridad);
}