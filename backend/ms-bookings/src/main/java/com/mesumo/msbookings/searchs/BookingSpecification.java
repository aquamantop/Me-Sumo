package com.mesumo.msbookings.searchs;

import com.mesumo.msbookings.models.entities.Booking;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;

public class BookingSpecification implements Specification<Booking> {
    public static Specification<Booking> allBookings() {

        return (root, query, criteriaBuilder) -> {

            return criteriaBuilder.not(criteriaBuilder.isNull(root.get("title")));
        };

    }

    public static Specification<Booking> bookingsBySlotAndDate(Long slotId, LocalDate date, boolean approved) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("slotId"), slotId),
                    criteriaBuilder.equal(root.get("date"), date),
                    criteriaBuilder.equal(root.get("approved"), approved));
        };
    }

    public static Specification<Booking> bookingsApproved(boolean approved) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("approved"), approved));
        };
    }

    public static Specification<Booking> bookingsByClub(Long clubId) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("clubId"), clubId));
        };
    }

    @Override
    public Predicate toPredicate(Root<Booking> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        return null;
    }

}
