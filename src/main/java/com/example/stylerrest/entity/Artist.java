package com.example.stylerrest.entity;

import jakarta.persistence.*;

@Table(name = "artist")
@Entity
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public long studio_id; // fk

    public String img;

    @Column(nullable = false)
    public String role;
}
