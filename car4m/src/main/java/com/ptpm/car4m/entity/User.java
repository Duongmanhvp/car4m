package com.ptpm.car4m.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "user")
public class User {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@Column(nullable = false, unique = true, name = "username")
	String username;
	
	@Column(nullable = false, name = "password")
	String password;
	
	@Column(name = "address")
	String address;
	
	@Column(nullable = false, unique = true, name = "phone")
	String phone;
	
	@Column(nullable = false, unique = true, name = "email")
	String email;
	
	@Column(name = "image")
	String image;
	
	@OneToOne
	@JoinColumn(name = "driving_license_id")
	DrivingLicense drivingLicense;
	
	@OneToOne
	@JoinColumn(name = "identity_card_id")
	IdentityCard identityCard;
	
	
}
