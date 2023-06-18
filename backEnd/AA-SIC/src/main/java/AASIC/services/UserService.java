package AASIC.services;

import AASIC.model.*;
import AASIC.repositories.*;
import AASIC.requests.*;
import AASIC.responses.GetSavedEventsResponse;
import AASIC.responses.GetSuggestedEventsResponse;
import AASIC.responses.GetTicketsListedByUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final EventRepo eventRepo;
    private final SuggestedEventRepo suggestedEventRepo;
    private final TicketTypeRepo ticketTypeRepo;
    private final AdRepo adRepo;
    private final EventSavedRepo eventSavedRepo;
    private final EventFollowedRepo eventFollowedRepo;

    public void edit_profile(EditProfileRequest request, String email) {
        User user = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found."));

        if(request.getEmail() != null) user.setEmail(request.getEmail());
        if(request.getPhone() != null) user.setPhone(request.getPhone());
        if(request.getPassword() != null) user.setPassword(request.getPassword());
        if(request.getLanguage() != null) user.setLanguage(request.getLanguage());
        if(request.getCard_number() != null) user.setCard_number(request.getCard_number());
        if(request.getCard_cvc() != null) user.setCard_cvc(request.getCard_cvc());
        if(request.getPicture() != null) user.setProfile_pic(request.getPicture());

        userRepo.save(user);
    }

    public void suggest_event(SuggestEventRequest request, String email) {

        User user = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        SuggestedEvent suggestedEvent = new SuggestedEvent();

        suggestedEvent.setName(request.getEvent_name());
        suggestedEvent.setLocation(request.getAddress());

        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            LocalDateTime start_date = LocalDateTime.parse(request.getStart_date(), formatter);
            LocalDateTime end_date = LocalDateTime.parse(request.getEnd_date(), formatter);


            suggestedEvent.setStart_date(start_date);
            suggestedEvent.setEnd_date(end_date);
        }
        catch (Exception e){
            System.out.println("Date Format Incorrect!");
        }
        suggestedEvent.setUser(user);

        suggestedEventRepo.save(suggestedEvent);

    }

    public List<GetSuggestedEventsResponse> get_suggested_events() {

        List<SuggestedEvent> suggestedEventList = suggestedEventRepo.findAll();
        List<GetSuggestedEventsResponse> response = new ArrayList<>();

        for(SuggestedEvent se : suggestedEventList) {
            GetSuggestedEventsResponse aux = new GetSuggestedEventsResponse();
            aux.setId(se.getId());
            aux.setName(se.getName());
            aux.setAddress(se.getLocation());

            // -- LocalDateTime to String --

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            LocalDateTime start_date = se.getStart_date();
            LocalDateTime end_date = se.getEnd_date();

            // -----------------------------

            aux.setStart_date(start_date.format(formatter));
            aux.setEnd_date(end_date.format(formatter));

            response.add(aux);
        }
        return response;
    }

    public void sell_ticket(SellTicketRequest request, String email) {
        User user = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        Ad ad = new Ad();
        ad.setEvent(eventRepo.findById(request.getEvent_id()).get());
        ad.setDate(LocalDateTime.now());
        ad.setUser(user);
        ad.setTicket_type(ticketTypeRepo.findById(request.getType_id()).get());
        ad.setPrice(request.getPrice());
        ad.setTicket(request.getFile());
        ad.setDescription(request.getDescription());
        ad.setSold(false);

        adRepo.save(ad);

    }

    public List<GetTicketsListedByUserResponse> get_tickets_listed_by_user(String email) {
        User user = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        List<Ad> adsByUser = adRepo.findAdsByUser(user.getId());

        List<GetTicketsListedByUserResponse> response = new ArrayList<>();

        for(Ad a : adsByUser){
            GetTicketsListedByUserResponse aux = new GetTicketsListedByUserResponse();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            aux.setStart_date(a.getEvent().getDate_start().format(formatter));  //12/12/2018 18:25:58
            aux.setEnd_date(a.getEvent().getDate_end().format(formatter));
            aux.setCreated_date(a.getDate().format(formatter));
            aux.setTicket_type(a.getTicket_type().getType());
            aux.setEvent_name(a.getEvent().getName());
            aux.setEvent_place(a.getEvent().getLocation().getName());
            aux.setTicket_price(a.getPrice());
            aux.setTicket_id(a.getId());
            if (a.getSold()) aux.setTicket_status("sold");
            else aux.setTicket_status("available");

            response.add(aux);
        }
        return response;
    }

    public void remove_ticket_listing(RemoveTicketListingRequest request) {
        adRepo.deleteById(request.getAd_id());
    }

    public void save_event (SaveEventRequest request, String email) {

        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        Event e = eventRepo.findById(request.getEvent_id()).get();

        EventSaved eventSaved = new EventSaved();
        eventSaved.setEvent(e);
        eventSaved.setUser(u);
        eventSavedRepo.save(eventSaved);
    }

    public void follow_event(FollowEventRequest request, String email) {

        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        Event e = eventRepo.findById(request.getEvent_id()).get();

        EventFollowed eventFollowed = new EventFollowed();
        eventFollowed.setEvent(e);
        eventFollowed.setUser(u);
        eventFollowedRepo.save(eventFollowed);

    }

    public List<GetSavedEventsResponse> get_saved_events(String email) {
        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        List<GetSavedEventsResponse> response = new ArrayList<>();
        for (EventSaved eventSaved : u.getEvents_saved()){
            GetSavedEventsResponse aux = new GetSavedEventsResponse();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            aux.setEvent_id(eventSaved.getEvent().getId());
            aux.setStart_date(eventSaved.getEvent().getDate_start().format(formatter));
            aux.setEnd_date(eventSaved.getEvent().getDate_end().format(formatter));
            aux.setEvent_name(eventSaved.getEvent().getName());
            aux.setEvent_place(eventSaved.getEvent().getLocation().getName());

            response.add(aux);
        }
        return response;
    }
}
