package com.example.stylerrest.repo;

import com.example.stylerrest.entity.Artist;
import com.example.stylerrest.entity.Service;
import com.example.stylerrest.entity.Studio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepo extends CrudRepository<Service, Long> {
    @Query("SELECT s FROM Service s WHERE s.studio_id = :studio_id")
    List<Service> findBy_studio_id(Long studio_id);
}
