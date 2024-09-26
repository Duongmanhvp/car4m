package com.ptpm.car4m.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "rental")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    Car car;

    @Column(name = "rental_date", nullable = false)
    LocalDateTime rentalDate;

    @Column(name = "receive_date", nullable = false)
    LocalDateTime receiveDate;

    @Column(name = "return_date")
    LocalDateTime returnDate;
}