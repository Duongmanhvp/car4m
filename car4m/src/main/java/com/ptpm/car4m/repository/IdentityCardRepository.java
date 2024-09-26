package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.IdentityCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentityCardRepository extends JpaRepository<IdentityCard, Long> {
}