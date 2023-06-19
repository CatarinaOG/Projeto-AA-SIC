package AASIC.services;

import AASIC.model.Ad;
import AASIC.model.Event;
import AASIC.model.Location;
import AASIC.model.TicketType;
import AASIC.repositories.EventRepo;
import AASIC.requests.GetFilteredEventsRequest;
import AASIC.requests.GetFullEventRequest;
import AASIC.requests.GetTicketTypesEventRequest;
import AASIC.responses.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    private int get_upcoming_events(Location location){
        int upcoming_events = 0;
        for (Event e : location.getEvents()){
            if (e.getDate_start().isAfter(LocalDateTime.now())){
                upcoming_events++;
            }
        }
        return upcoming_events;
    }

    public GetFullEventResponse get_full_event(GetFullEventRequest request) {
        Event e = eventRepo.findById(request.getEvent_id()).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        int tickets_sold = e.getAds().stream().filter(Ad::getSold).toList().size();
        int upcoming_events = get_upcoming_events(e.getLocation());
        return GetFullEventResponse
                .builder()
                .id(e.getId())
                .start_date(e.getDate_start().format(formatter))
                .end_date(e.getDate_end().format(formatter))
                .event_name(e.getName())
                .event_place(e.getLocation().getName())
                .image(e.getLocation().getMap())
                .tickets_available(e.getAds().size())
                .tickets_sold(tickets_sold)
                .tickets_wanted(e.getUsers_saved().size())
                .event_saved(!e.getUsers_saved().isEmpty())
                .event_followed(!e.getUsers_following().isEmpty())
                .lat(e.getLocation().getLatitude())
                .lng(e.getLocation().getLongitude())
                .upcoming_events(upcoming_events)
                .build();
    }


    public GetFiltersResponse get_filters_events() {

        List<Event> eventList = eventRepo.findAll();

        List<String> place_filters = new ArrayList<>();
        List<String> category_filters = new ArrayList<>();

        for(Event e : eventList){

            if(!place_filters.contains(e.getLocation().getName())){
                place_filters.add(e.getLocation().getName());
            }
            if(!place_filters.contains(e.getCategory().getName())) {
                category_filters.add(e.getCategory().getName());
            }
        }

        return GetFiltersResponse
                .builder()
                .place(place_filters)
                .category(category_filters)
                .build();

    }

    public List<GetEventsResponse> get_events() {
        List<Event> eventList = eventRepo.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        List<GetEventsResponse> response = new ArrayList<>();

        for(Event e : eventList){
            GetEventsResponse aux = GetEventsResponse
                    .builder()
                    .id(e.getId())
                    .start_date(e.getDate_start().format(formatter))
                    .end_date(e.getDate_end().format(formatter))
                    .name(e.getName())
                    .address(e.getLocation().getName())
                    .build();
            response.add(aux);
        }
        return response;
    }

    public List<GetFilteredEventsResponse> get_filtered_events(GetFilteredEventsRequest request) {

        List<Event> eventList = eventRepo.findAll();
        List<GetFilteredEventsResponse> response = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        String filter_text = request.getFilter_text();
        String filter_place = request.getFilter_place();
        String filter_time = request.getFilter_time();
        String filter_category = request.getFilter_category();

        for(Event e : eventList){
            if(filter_text != null && !filter_text.isEmpty()){
                if (!e.getName().contains(filter_text)){
                    continue;
                }
            }
            if(filter_place != null && !filter_place.isEmpty()){
                if (!e.getLocation().getName().equals(filter_place)){
                    continue;
                }
            }
            //if(filter_time != null){
            //    LocalDateTime filter = LocalDateTime.parse(filter_text, formatter);
            //    if(!)
            //}
            if(filter_category != null && !filter_category.isEmpty()){
                if(!e.getCategory().getName().equals(filter_category)){
                    continue;
                }
            }
            GetFilteredEventsResponse aux = GetFilteredEventsResponse
                    .builder()
                    .id(e.getId())
                    .start_date(e.getDate_start().format(formatter))
                    .end_date(e.getDate_end().format(formatter))
                    .event_name(e.getName())
                    .event_place(e.getLocation().getName())
                    .build();
            response.add(aux);
        }
        return response;
    }
}
