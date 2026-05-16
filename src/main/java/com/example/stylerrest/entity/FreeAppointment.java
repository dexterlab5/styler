package com.example.stylerrest.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "free_appointment",
        uniqueConstraints = {
        @UniqueConstraint(
                name = "uc_date_hour_minute",
                columnNames = {"artist_id", "date", "hour", "minute"}
        )
})
public class FreeAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public long id;

    @Column(nullable = false)
    public long studio_id;

    @Column(nullable = false)
    public long artist_id;

    @Column(nullable = false)
    public String date;

    @Column(nullable = false)
    public String hour;

    @Column(nullable = false)
    public String minute;
}
