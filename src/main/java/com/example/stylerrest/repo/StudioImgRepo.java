package com.example.stylerrest.repo;

import com.example.stylerrest.entity.StudioImg;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudioImgRepo extends CrudRepository<StudioImg, Long> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM studio_img WHERE studio_id = :studio_id", nativeQuery = true)
    void deleteAllByStudio_id(@Param("studio_id") long studio_id);

    @Query(value = "SELECT * FROM studio_img WHERE studio_id = :studio_id", nativeQuery = true)
    List<StudioImg> findAllByStudio_id(@Param("studio_id") long studio_id);
}
