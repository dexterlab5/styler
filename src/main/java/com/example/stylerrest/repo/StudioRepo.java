package com.example.stylerrest.repo;

import com.example.stylerrest.entity.Studio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudioRepo extends CrudRepository<Studio, Long> {
    @Query("SELECT s FROM Studio s WHERE s.user_id = :user_id")
    Studio findBy_user_id(Long user_id);
}
