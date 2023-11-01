package com.mesumo.msclubs.models.repository.feign;

import com.mesumo.msclubs.models.dto.BookingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BookingsFeignRepository implements IBookingsFeignClient{

    private final IBookingsFeignClient feignClient;

    @Override
    public List<BookingDTO> getAll(String clubId) {
        List<BookingDTO> response  = feignClient.getAll(clubId);
        return response;
    }
}
