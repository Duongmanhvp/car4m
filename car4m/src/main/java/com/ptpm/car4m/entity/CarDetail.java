package com.ptpm.car4m.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "car_detail")
public class CarDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "transmission")
    @Enumerated(EnumType.STRING)
    Transmission transmission;

    @Column(name = "fuel")
    @Enumerated(EnumType.STRING)
    Fuel fuel;

    @Column(name = "seats")
    Integer seats;

    @Column(name = "fuel_consumption")
    String fuelConsumption;

    @Column(name = "description")
    String description;
    
    @Column(name = "images")
    String images;
    
    @JsonIgnore
    @OneToOne(mappedBy = "carDetail")
    Car car;
    
    @OneToMany(mappedBy = "carDetail")
    Set<CarDetailComfort> carDetailComforts;
    
}