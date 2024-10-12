package com.ptpm.car4m.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ptpm.car4m.enums.LicenseClass;
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
@Table(name = "driving_license")
public class DrivingLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "no", unique = true)
    String no;

    @Column(name = "class")
    @Enumerated(EnumType.STRING)
    LicenseClass licenseClass;

    @Column(name = "image_url")
    String imageUrl;

    @JsonIgnore
    @OneToOne(mappedBy = "drivingLicense")
    User user;
}