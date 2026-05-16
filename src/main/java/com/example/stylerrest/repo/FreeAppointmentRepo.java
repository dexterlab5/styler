package com.example.stylerrest.repo;

import com.example.stylerrest.entity.FreeAppointment;
import com.example.stylerrest.entity.Service;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FreeAppointmentRepo extends CrudRepository<FreeAppointment, Long> {
    @Query("SELECT f FROM FreeAppointment f WHERE f.studio_id = :studio_id")
    List<FreeAppointment> findBy_studio_id(Long studio_id);
}
