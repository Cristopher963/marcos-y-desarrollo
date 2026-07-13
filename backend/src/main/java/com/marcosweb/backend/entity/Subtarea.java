package com.marcosweb.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subtareas")
public class Subtarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSubtarea;

    @Column(nullable = false)
    private String titulo;

    private Boolean completada = false;

    @ManyToOne
    @JoinColumn(name = "id_tarea")
    private Tarea tarea;

    public Subtarea() {}

    public Integer getIdSubtarea() {
        return idSubtarea;
    }

    public void setIdSubtarea(Integer idSubtarea) {
        this.idSubtarea = idSubtarea;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Boolean getCompletada() {
        return completada;
    }

    public void setCompletada(Boolean completada) {
        this.completada = completada;
    }

    public Tarea getTarea() {
        return tarea;
    }

    public void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }
}