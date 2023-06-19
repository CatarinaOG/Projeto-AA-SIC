package AASIC.services;

import AASIC.model.*;
import AASIC.repositories.EventRepo;
import AASIC.repositories.UserRepo;
import AASIC.requests.GetFilteredEventsRequest;
import AASIC.requests.GetFullEventRequest;
import AASIC.requests.GetTicketTypesEventRequest;
import AASIC.responses.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepo eventRepo;
    private final UserRepo userRepo;

    public List<GetTicketTypesEventReponse> get_ticket_types_event(GetTicketTypesEventRequest request) {

        Event event = eventRepo.findById(request.getEvent_id()).get();
        List<TicketType> ticketTypeList = event.getTicket_type_list();

        List<GetTicketTypesEventReponse> response = new ArrayList<>();

        for (TicketType tt : ticketTypeList){
            int nr_available = Long.valueOf(tt.getAds().stream().filter(a -> !a.getSold()).count()).intValue();
            GetTicketTypesEventReponse aux = GetTicketTypesEventReponse
                    .builder()
                    .id(tt.getId())
                    .description(tt.getType())
                    .price(tt.getPrice())
                    .max_price(tt.getRange())
                    .nr_available(nr_available)
                    .build();

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

    public GetFullEventResponse get_full_event(GetFullEventRequest request, String email) {
        Event e = eventRepo.findById(request.getEvent_id()).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        int tickets_sold = e.getAds().stream().filter(Ad::getSold).toList().size();
        int upcoming_events = get_upcoming_events(e.getLocation());
        List<GetArtistsResponse> artists = new ArrayList<>();
        
        for(ArtistInEvent aie : e.getArtist_list()){
            Artist a = aie.getArtist();
            GetArtistsResponse aux = GetArtistsResponse
                    .builder()
                    .artist_code(a.getId())
                    .artist_name(a.getName())
                    .build();
            artists.add(aux);
        }

        boolean event_followed = false;
        boolean event_saved = false;
        if(!email.isEmpty()){
            User u = userRepo.findUserByEmail(email).get();
            event_followed = e.getUsers_following().stream().map(EventFollowed::getUser).toList().contains(u);
            event_saved = e.getUsers_saved().stream().map(EventSaved::getUser).toList().contains(u);
        }

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
                .event_saved(event_saved)
                .event_followed(event_followed)
                .lat(e.getLocation().getLatitude())
                .lng(e.getLocation().getLongitude())
                .upcoming_events(upcoming_events)
                .artists(artists)
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

        String filter_text = request.getFilter_text().toLowerCase();
        String filter_place = request.getFilter_place().toLowerCase();
        String filter_time = request.getFilter_time().toLowerCase();
        String filter_category = request.getFilter_category().toLowerCase();

        for(Event e : eventList){
            if(!filter_text.isEmpty()){
                if (!e.getName().toLowerCase().contains(filter_text)){
                    continue;
                }
            }
            if(!filter_place.isEmpty()){
                if (!e.getLocation().getName().toLowerCase().equals(filter_place)){
                    continue;
                }
            }
            // "next week", "this month", "next month", "this year", "next year"
            if(!filter_time.isEmpty()){
                LocalDateTime event = e.getDate_start();
                LocalDateTime today = LocalDateTime.now();
                LocalDateTime weekToday = today.plusWeeks(1);
                LocalDateTime nextWeek = weekToday.plusWeeks(1);
                LocalDateTime monthToday = today.plusMonths(1);
                LocalDateTime nextMonth = monthToday.plusMonths(1);
                LocalDateTime yearToday = today.plusYears(1);
                LocalDateTime nextYear = yearToday.plusYears(1);
                switch (filter_time){
                    case "this week":
                        if(!(!today.isAfter(event) && event.isBefore(weekToday))) continue;
                        break;
                    case "next week":
                        if (!(!weekToday.isAfter(event) && event.isBefore(nextWeek))) continue;
                        break;
                    case "this month":
                        if(!(!today.isAfter(event) && event.isBefore(monthToday))) continue;
                        break;
                    case "next month":
                        if(!(!monthToday.isAfter(event) && event.isBefore(nextMonth))) continue;
                        break;
                    case "this year":
                        if(!(!today.isAfter(event) && event.isBefore(yearToday))) continue;
                        break;
                    case "next year":
                        if(!(!yearToday.isAfter(event) && event.isBefore(nextYear))) continue;
                        break;
                    default:
                        break;
                }
            }
            if(!filter_category.isEmpty()){
                if(!e.getCategory().getName().toLowerCase().equals(filter_category)){
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
