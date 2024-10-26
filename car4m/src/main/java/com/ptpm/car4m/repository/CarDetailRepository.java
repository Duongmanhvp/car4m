package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.CarDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarDetailRepository extends JpaRepository<CarDetail, Long> {
}
