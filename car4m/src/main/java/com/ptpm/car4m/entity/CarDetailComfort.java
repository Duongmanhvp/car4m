package com.ptpm.car4m.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "car_detail_comfort")
public class CarDetailComfort {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @ManyToOne
    @JoinColumn(name = "car_detail_id")
    CarDetail carDetail;

    @ManyToOne
    @JoinColumn(name = "comfort_id")
    Comfort comfort;
}