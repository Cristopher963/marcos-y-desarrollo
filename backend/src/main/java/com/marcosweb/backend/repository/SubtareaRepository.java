package com.marcosweb.backend.repository;

import com.marcosweb.backend.entity.Subtarea;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubtareaRepository extends JpaRepository<Subtarea, Integer> {
    List<Subtarea> findByTareaIdTarea(Integer idTarea);
}