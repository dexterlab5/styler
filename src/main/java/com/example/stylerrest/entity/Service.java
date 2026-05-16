package com.example.stylerrest.entity;


import jakarta.persistence.*;

@Table(name = "service")
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public Long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String time;

    @Column(nullable = false)
    public String extra;

    @Column(nullable = false)
    public String price;

    @Column(nullable = false)
    public long studio_id;
}
