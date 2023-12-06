package com.mesumo.msclubs.models.searchs;

import com.mesumo.msclubs.models.entities.Court;
import com.mesumo.msclubs.models.entities.DayEntity;
import com.mesumo.msclubs.models.entities.Slot;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalTime;
import java.util.Collection;

public class SlotSpecification implements Specification<Slot> {
    @Override
    public Specification<Slot> and(Specification<Slot> other) {
        return Specification.super.and(other);
    }

    @Override
    public Specification<Slot> or(Specification<Slot> other) {
        return Specification.super.or(other);
    }

    @Override
    public Predicate toPredicate(Root<Slot> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        return null;
    }

    public static Specification<Slot> byCourt(Court court) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("court"), court);
    }

    public static Specification<Slot> byTimeRange(LocalTime startTime, LocalTime endTime) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.greaterThanOrEqualTo(root.get("startTime"), startTime),
                        criteriaBuilder.lessThanOrEqualTo(root.get("endTime"), endTime)
                );
    }

    public static Specification<Slot> byDays(Collection<Long> dayIds) {
        return (root, query, criteriaBuilder) -> {
            Join<Slot, DayEntity> join = root.join("days");
            return join.get("id").in(dayIds);
        };
    }


}
