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
@Table(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    User owner;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "rental_fee", nullable = false)
    Long rentalFee;

    @Column(name = "status", nullable = false)
    String status;

    @Column(name = "type", nullable = false)
    String type;

    @Column(name = "location_id", nullable = false)
    Long locationId;

    @OneToOne
    @JoinColumn(name = "car_detail_id")
    CarDetail carDetail;
}