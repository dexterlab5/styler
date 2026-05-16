package com.example.stylerrest.entity;

import jakarta.persistence.*;

@Table(name = "termin")
@Entity
public class Termin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public long id; // public MANDATORY!!!

    @Column(nullable = false)
    public long user_id;

    @Column(nullable = false)
    public long studio_id;

    @Column(nullable = false)
    public long artist_id;

    @Column(nullable = false)
    public long service_id;

    @Column(nullable = false)
    public String year;

    @Column(nullable = false)
    public String month;

    @Column(nullable = false)
    public String day;

    @Column(nullable = false)
    public String time;

    @Column(nullable = false)
    public String note;

}
