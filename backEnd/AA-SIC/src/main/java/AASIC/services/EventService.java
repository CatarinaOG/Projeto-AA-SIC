package AASIC.services;

import AASIC.model.Event;
import AASIC.model.TicketType;
import AASIC.repositories.EventRepo;
import AASIC.requests.GetTicketTypesEventRequest;
import AASIC.requests.TicketTypeRequest;
import AASIC.responses.GetTicketTypesEventReponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepo eventRepo;

    public List<GetTicketTypesEventReponse> get_ticket_types_event(GetTicketTypesEventRequest request) {

        Event event = eventRepo.findById(request.getEvent_id()).get();
        List<TicketType> ticketTypeList = event.getTicket_type_list();

        List<GetTicketTypesEventReponse> response = new ArrayList<>();

        for (TicketType tt : ticketTypeList){
            GetTicketTypesEventReponse aux = new GetTicketTypesEventReponse();
            aux.setId(tt.getId());
            aux.setDescription(tt.getType());
            aux.setPrice(tt.getPrice());
            aux.setPrice(tt.getRange());

            response.add(aux);
        }
        return response;
    }
}
