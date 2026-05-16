package com.example.stylerrest.repo;

import com.example.stylerrest.entity.Termin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerminRepo extends CrudRepository<Termin, Long> {
}
