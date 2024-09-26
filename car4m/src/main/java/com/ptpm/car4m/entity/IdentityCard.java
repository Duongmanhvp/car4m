package com.ptpm.car4m.entity;

import com.ptpm.car4m.enums.Sex;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "identity_card")
public class IdentityCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "no", unique = true)
    String no;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "sex")
    @Enumerated(EnumType.STRING)
    Sex sex;

    @Column(name = "nationality")
    String nationality;

    @Column(name = "date_of_birth")
    LocalDate dateOfBirth;

    @Column(name = "image_url")
    String imageUrl;

    @OneToOne(mappedBy = "identityCard")
    User user;
}