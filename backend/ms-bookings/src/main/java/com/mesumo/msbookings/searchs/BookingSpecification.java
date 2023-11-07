package com.mesumo.msbookings.searchs;

import com.mesumo.msbookings.models.entities.Booking;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

public class BookingSpecification implements Specification<Booking> {
    public static Specification<Booking> allBookings() {

        return (root, query, criteriaBuilder) -> {

            return criteriaBuilder.not(criteriaBuilder.isNull(root.get("title")));
        };

    }

    public static Specification<Booking> bookingsByDate(Date startDate, Date endDate) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.and(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("date"), startDate),
                    criteriaBuilder.lessThanOrEqualTo(root.get("date"), endDate)
            );
        };
    }

    @Override
    public Predicate toPredicate(Root<Booking> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        return null;
    }
}
