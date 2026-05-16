package com.example.stylerrest.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "studio_img")
public class StudioImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public long id;

    @Column(nullable = false)
    public long studio_id;

    @Column(nullable = false)
    public String img;
}
