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


    public static Specification<Slot> byUniqueDaysAndTime(Court court, LocalTime startTime, LocalTime endTime, Collection<Long> dayIds) {
        return (root, query, criteriaBuilder) -> {
            Join<Slot, DayEntity> join = root.join("days");

            Predicate courtCondition = criteriaBuilder.equal(root.get("court"), court);
            Predicate timeCondition = criteriaBuilder.or(
                    criteriaBuilder.and(
                            criteriaBuilder.lessThanOrEqualTo(root.get("startTime"), startTime),
                            criteriaBuilder.greaterThanOrEqualTo(root.get("endTime"), startTime)
                    ),
                    criteriaBuilder.and(
                            criteriaBuilder.lessThanOrEqualTo(root.get("startTime"), endTime),
                            criteriaBuilder.greaterThanOrEqualTo(root.get("endTime"), endTime)
            )

            );
            Predicate dayCondition = join.get("id").in(dayIds);

            return criteriaBuilder.and(courtCondition, timeCondition, dayCondition);
        };
    }
}
