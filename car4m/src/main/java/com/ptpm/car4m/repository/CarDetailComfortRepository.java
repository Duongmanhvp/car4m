package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.CarDetailComfort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarDetailComfortRepository extends JpaRepository<CarDetailComfort, Long> {
}