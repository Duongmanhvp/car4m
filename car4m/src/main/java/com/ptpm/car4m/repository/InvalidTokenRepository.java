package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface InvalidTokenRepository extends JpaRepository<InvalidToken, Long> {
	boolean existsByToken(String token);
	void deleteInvalidTokensByExpiryTimeBefore(LocalDateTime expiryTime);
	void deleteByExpiryTimeBefore(LocalDateTime expiryTime);

}