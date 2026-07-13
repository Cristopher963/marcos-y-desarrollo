package com.marcosweb.backend.repository;

import com.marcosweb.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    List<Categoria> findByUsuarioIdUsuario(Integer idUsuario);
}