package com.marcosweb.backend.service;

import com.marcosweb.backend.entity.Categoria;
import com.marcosweb.backend.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public List<Categoria> listarPorUsuario(Integer idUsuario) {
        return categoriaRepository.findByUsuarioIdUsuario(idUsuario);
    }

    public Categoria guardar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria actualizar(Integer id, Categoria categoria) {
        Categoria existente = buscarPorId(id);

        if (existente == null) {
            return null;
        }

        existente.setNombre(categoria.getNombre());
        existente.setColor(categoria.getColor());
        existente.setUsuario(categoria.getUsuario());

        return categoriaRepository.save(existente);
    }

    public void eliminar(Integer id) {
        categoriaRepository.deleteById(id);
    }
}
