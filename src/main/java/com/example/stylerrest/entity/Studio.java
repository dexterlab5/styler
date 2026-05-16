package com.example.stylerrest.entity;

import jakarta.persistence.*;

@Table(name = "studio")
@Entity
public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public long id; // PUBLIC explicitly!!!

    @Column(nullable = false)
    public String name;

    public String description;

    @Column(nullable = false)
    public long user_id;
}
