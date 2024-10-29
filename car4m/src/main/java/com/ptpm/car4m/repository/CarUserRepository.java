package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.CarDetail;
import com.ptpm.car4m.entity.CarUser;
import com.ptpm.car4m.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarUserRepository extends JpaRepository<CarUser, Long> {
	boolean existsByCarAndUser(Car car, User user);
	
	Page<CarUser> findByUserId(long userId, Pageable pageable);
}
