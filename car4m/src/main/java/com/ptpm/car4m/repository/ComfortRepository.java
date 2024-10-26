package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.CarDetail;
import com.ptpm.car4m.entity.Comfort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComfortRepository extends JpaRepository<Comfort, Integer> {
}
