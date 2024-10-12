package com.ptpm.car4m.entity;

import com.ptpm.car4m.enums.Role;
import com.ptpm.car4m.enums.Transmission;
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
	
	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	Role role;
	
	@OneToOne
	@JoinColumn(name = "driving_license_id", referencedColumnName = "id")
	DrivingLicense drivingLicense;
	
	@OneToOne
	@JoinColumn(name = "identity_card_id", referencedColumnName = "id")
	IdentityCard identityCard;
	
	
}
