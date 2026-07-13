package com.marcosweb.backend.service;

import com.marcosweb.backend.entity.Usuario;
import com.marcosweb.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Integer id, Usuario usuario) {
        Usuario existente = buscarPorId(id);

        if (existente == null) {
            return null;
        }

        existente.setNombre(usuario.getNombre());
        existente.setEmail(usuario.getEmail());
        existente.setPassword(usuario.getPassword());

        return usuarioRepository.save(existente);
    }

    public void eliminar(Integer id) {
        usuarioRepository.deleteById(id);
    }
}