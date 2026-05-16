package com.example.stylerrest.entity;

import jakarta.persistence.*;

@Table(name = "user")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public long id; // PUBLIC explicitly!!!

    @Column(nullable = false)
    public String name; // PUBLIC explicitly!!!

    @Column(unique = true, length = 100, nullable = false)
    public String email; // PUBLIC explicitly!!!

    @Column(nullable = false)
    public String password; // bcrypt

    @Column(nullable = false)
    public boolean studio;
}
