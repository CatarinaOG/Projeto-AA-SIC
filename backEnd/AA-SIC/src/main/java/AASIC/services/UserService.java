package AASIC.services;

import AASIC.model.*;
import AASIC.repositories.*;
import AASIC.requests.*;
import AASIC.responses.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Duration;
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
    private final ArtistInEventRepo artistInEventRepo;
    private final NotificationRepo notificationRepo;

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

    private void notify_users(Event e, String op){
        List<EventFollowed> userList = e.getUsers_following();
        String title = "";
        String content = "";
        if (op.equals("sell")){
            title = "New Ad in a followed Event!";
            content = "Event " + e.getName() + " has a new Ticket for sale! Check it out!";
        }
        else if(op.equals("buy")){
            title = "One of your tickets has been bought!!";
            content = "Your ticket to " + e.getName() + " has been sold! Check it out!";
        }
        for(EventFollowed eventFollowed : userList){
            Notification n = Notification
                    .builder()
                    .title(title)
                    .content(content)
                    .date(LocalDateTime.now())
                    .build();
            n.setUser(eventFollowed.getUser());

            notificationRepo.save(n);
        }
    }

    public void sell_ticket(SellTicketRequest request, String email) {
        User user = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        Event e = eventRepo.findById(request.getEvent_id()).get();
        Ad ad = new Ad();
        ad.setEvent(e);
        ad.setDate(LocalDateTime.now());
        ad.setUser(user);
        ad.setTicket_type(ticketTypeRepo.findById(request.getType_id()).get());
        ad.setPrice(request.getPrice());
        ad.setTicket(request.getFile());
        ad.setDescription(request.getDescription());
        ad.setSold(false);
        adRepo.save(ad);

        notify_users(e,"sell");
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

    @Transactional
    public void remove_ticket_listing(RemoveTicketListingRequest request) {
        adRepo.removeAdById(request.getAd_id());
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


    public List<GetFollowedEventsReponse> get_followed_events(String email) {

        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        List<GetFollowedEventsReponse> response = new ArrayList<>();
        for (EventFollowed eventFollowed : u.getEvents_followed()){
            GetFollowedEventsReponse aux = new GetFollowedEventsReponse();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            aux.setEvent_id(eventFollowed.getEvent().getId());
            aux.setStart_date(eventFollowed.getEvent().getDate_start().format(formatter));
            aux.setEnd_date(eventFollowed.getEvent().getDate_end().format(formatter));
            aux.setEvent_name(eventFollowed.getEvent().getName());
            aux.setEvent_place(eventFollowed.getEvent().getLocation().getName());

            response.add(aux);
        }
        return response;
    }

    @Transactional
    public void remove_saved_event(RemoveSavedEventRequest request, String email) {
        User u = userRepo.findUserByEmail(email).get();
        EventSaved e = u.getEvents_saved().stream().filter(es -> es.getEvent().getId() == request.getEvent_id()).findFirst().get();
        eventSavedRepo.removeEventSavedById(e.getId());
    }

    @Transactional
    public void remove_followed_event(RemoveFollowedEventRequest request, String email){
        User u = userRepo.findUserByEmail(email).get();
        EventFollowed e = u.getEvents_followed().stream().filter(ef -> ef.getEvent().getId() == request.getEvent_id()).findFirst().get();
        eventFollowedRepo.removeEventFollowedById(e.getId());
    }

    public AuthenticationResponse get_user(String email) {
        User u = userRepo.findUserByEmail(email).get();
        return AuthenticationResponse
                .builder()
                .type("user")
                .user_id(u.getId())
                .profile_pic(u.getProfile_pic())
                .name(u.getName())
                .phone(u.getPhone())
                .language(u.getLanguage())
                .card_number(u.getCard_number())
                .card_cvc(u.getCard_cvc())
                .build();
    }

    public String buy_ticket(BuyTicketRequest request, String email) {
        Ad t = adRepo.findById(request.getTicket_id()).get();
        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        if(t.getUser().getId() == u.getId()){
            return "{\"confirmed\" : \"false\"}";
        }
        t.setSold(true);
        t.setBuyer(u);
        adRepo.save(t);
        notify_users(t.getEvent(), "buy");
        return "{\"confirmed\" : \"true\"}";
    }

    public List<GetBoughtTicketsByUserResponse> get_bought_tickets(String email) {

        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        List<Ad> ads = u.getTickets_bought();
        List<GetBoughtTicketsByUserResponse> response = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        for(Ad a : ads){
            GetBoughtTicketsByUserResponse aux = GetBoughtTicketsByUserResponse
                    .builder()
                    .id(a.getId())
                    .start_date(a.getEvent().getDate_start().format(formatter))
                    .end_date(a.getEvent().getDate_end().format(formatter))
                    .ticket_type(a.getTicket_type().getType())
                    .event_name(a.getEvent().getName())
                    .event_place(a.getEvent().getLocation().getName())
                    .ticket_price(a.getPrice())
                    .ticket_file(a.getTicket())
                    .build();
            response.add(aux);
        }
        return response;
    }

    public List<GetTicketsTypeEventResponse> get_tickets_by_type_and_event(GetTicketsTypeEventRequest request) {

        List<Ad> ads = adRepo.findAll().stream().filter(a -> !a.getSold()).toList();
        int type_id = request.getTicket_type_id();
        int event_id = request.getEvent_id();
        List<GetTicketsTypeEventResponse> response = new ArrayList<>();

        for(Ad a : ads){
            if (a.getTicket_type().getId() == type_id && a.getEvent().getId() == event_id){

                GetTicketsTypeEventResponse aux = new GetTicketsTypeEventResponse();
                aux.setId(a.getId());
                aux.setDescription(a.getDescription());
                aux.setPrice(a.getPrice());
                aux.setUser_image(a.getUser().getProfile_pic());
                aux.setUser_name(a.getUser().getName());
                aux.setUser_id(a.getId());

                response.add(aux);
            }
        }
        return response;
    }


    public List<GetTicketsTypeEventResponse> get_sold_tickets_by_type_and_event(GetTicketsTypeEventRequest request) {

        List<Ad> ads = adRepo.findAll().stream().filter(Ad::getSold).toList();
        int type_id = request.getTicket_type_id();
        int event_id = request.getEvent_id();
        List<GetTicketsTypeEventResponse> response = new ArrayList<>();

        for(Ad a : ads){
            if (a.getTicket_type().getId() == type_id && a.getEvent().getId() == event_id && a.getSold()){
                GetTicketsTypeEventResponse aux = new GetTicketsTypeEventResponse();
                aux.setId(a.getId());
                aux.setDescription(a.getDescription());
                aux.setPrice(a.getPrice());
                aux.setUser_image(a.getUser().getProfile_pic());
                aux.setUser_name(a.getUser().getName());

                response.add(aux);
            }
        }
        return response;

    }

    public List<EventsSuggestedForSellingTicketResponse> get_events_suggested_for_selling_ticket() {

        List<Event> eventList = eventRepo.findAll();
        List<EventsSuggestedForSellingTicketResponse> response = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        for(Event e : eventList){
            if (response.size() == 5){
                return response;
            }
            else{
                EventsSuggestedForSellingTicketResponse aux = new EventsSuggestedForSellingTicketResponse();
                aux.setId(e.getId());
                aux.setDate(e.getDate_start().format(formatter));

                Duration duration = Duration.between(e.getDate_start(), e.getDate_end());
                long daysBetween = duration.toDays();

                aux.setDuration(String.valueOf(daysBetween));
                aux.setAddress(e.getLocation().getAddress());
                aux.setName(e.getName());

                response.add(aux);
            }
        }
        return response;
    }

    public List<GetNotificationResponse> get_notifications_by_user(String email) {
        User u = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        List<GetNotificationResponse> response = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        for(Notification n : u.getNotifications()){
            GetNotificationResponse aux = GetNotificationResponse
                    .builder()
                    .notification_id(n.getId())
                    .title(n.getTitle())
                    .content(n.getContent())
                    .date(n.getDate().format(formatter))
                    .build();

            response.add(aux);
        }
        return response;
    }

    @Transactional
    public String remove_notification(RemoveNotificationRequest request) {
        notificationRepo.removeNotificationById(request.getNotification_id());
        return "{\"confirmed\" : \"true\"}";
    }
}
