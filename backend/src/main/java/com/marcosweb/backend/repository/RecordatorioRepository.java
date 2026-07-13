package com.marcosweb.backend.repository;

import com.marcosweb.backend.entity.Recordatorio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecordatorioRepository extends JpaRepository<Recordatorio, Integer> {
    List<Recordatorio> findByTareaIdTarea(Integer idTarea);
}