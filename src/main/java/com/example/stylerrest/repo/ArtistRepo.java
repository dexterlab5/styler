package com.example.stylerrest.repo;

import com.example.stylerrest.entity.Artist;
import com.example.stylerrest.entity.Studio;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepo extends CrudRepository<Artist, Long> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM artist WHERE studio_id = :studio_id", nativeQuery = true)
    void deleteAllByStudio_id(@Param("studio_id") long studio_id);

    @Query("SELECT a FROM Artist a WHERE a.studio_id = :studio_id")
    List<Artist> findBy_studio_id(Long studio_id);
}
