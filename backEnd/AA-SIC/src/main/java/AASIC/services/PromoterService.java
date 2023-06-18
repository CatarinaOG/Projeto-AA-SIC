package AASIC.services;


import AASIC.model.*;
import AASIC.repositories.*;
import AASIC.requests.*;
import AASIC.responses.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PromoterService {

    private final EventRepo eventRepo;
    private final ArtistRepo artistRepo;
    private final TicketTypeRepo ticketTypeRepo;
    private final ArtistInEventRepo artistInEventRepo;
    private final LocationRepo locationRepo;
    private final PromoterRepo promoterRepo;
    private final CategoryRepo categoryRepo;

    public void create_event(AddEventRequest request, String email){
        Event event = new Event();

        event.setName(request.getEvent_name());
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            LocalDateTime start_time = LocalDateTime.parse(request.getEvent_date_start(), formatter);
            LocalDateTime end_time = LocalDateTime.parse(request.getEvent_date_end(), formatter);

            event.setDate_start(start_time);
            event.setDate_end(end_time);
        }
        catch (Exception e){
            System.out.println("Date Format Incorrect!");
        }
        event.setAccepted(false);
        event.setLocation(locationRepo.findById(request.getEvent_venue_id()).get());
        Promoter promoter = promoterRepo.findPromoterByEmail(email).get();
        event.setPromoter(promoter);
        event.setCategory(categoryRepo.findById(Integer.parseInt(request.getEvent_category())).get());
        eventRepo.save(event);

        for (TicketTypeRequest ttr : request.getEvent_types()){
            TicketType tt = new TicketType();
            tt.setEvent(event);
            tt.setType(ttr.getTicket_type());
            tt.setPrice(ttr.getPrice());
            tt.setRange(ttr.getPrice()*1.05f);
            try{
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");


                tt.setStart_date(LocalDateTime.parse(ttr.getType_date_start(),formatter));
                tt.setEnd_date(LocalDateTime.parse(ttr.getType_date_end(), formatter));
            }
            catch (Exception e){
                System.out.println("Date Format Incorrect!");
            }
            ticketTypeRepo.save(tt);
        }

        for (ArtistRequest ar : request.getEvent_artists()){
            Optional<Artist> artist = artistRepo.findByName(ar.getArtist_name());
            if (artist.isPresent()){
                ArtistInEvent aie = new ArtistInEvent();
                aie.setEvent(event);
                aie.setArtist(artist.get());
                artistInEventRepo.save(aie);
            }
            else{
                Artist a = new Artist();
                a.setName(ar.getArtist_name());
                ArtistInEvent aie = new ArtistInEvent();
                aie.setEvent(event);
                aie.setArtist(a);
                artistRepo.save(a);
                artistInEventRepo.save(aie);
            }
        }
    }


    public String create_artist(CreateArtistRequest request) {
        if (artistRepo.findByName(request.getName()).isPresent()){
            return "{\"confirmed\" : \"false\"}";
        }
        String artis_name = request.getName();
        Artist artist = new Artist();
        artist.setName(artis_name);
        artistRepo.save(artist);
        return "{\"confirmed\" : \"true\"}";
    }

    public String create_category(CreateArtistRequest request) {
        if(categoryRepo.findByName(request.getName()).isPresent()){
            return "{\"confirmed\" : \"false\"}";
        }
        String categary_name = request.getName();
        Category category = new Category();
        category.setName(categary_name);
        categoryRepo.save(category);
        return "{\"confirmed\" : \"true\"}";
    }

    public String create_location(AddLocalRequest request) {
        if(locationRepo.findByName(request.getName()).isPresent()){
            return "{\"confirmed\" : \"false\"}";
        }
        Location location = new Location();
        location.setName(request.getName());
        location.setAddress(request.getAddress());
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setCapacity(request.getCapacity());
        location.setCity(request.getCity());
        locationRepo.save(location);
        return "{\"confirmed\" : \"true\"}";
    }

    public List<GetCategoriesResponse> get_categories() {
        List<GetCategoriesResponse> response = new ArrayList<>();
        List<Category> categoryList = categoryRepo.findAll();
        for (Category c : categoryList){
            GetCategoriesResponse aux = new GetCategoriesResponse();
            aux.setCategory_code(c.getId());
            aux.setCategory_name(c.getName());
            response.add(aux);
        }
        return response;
    }

    public List<GetVenuesResponse> get_venues() {
        List<GetVenuesResponse> response = new ArrayList<>();
        List<Location> locationList = locationRepo.findAll();
        for(Location l : locationList){
            GetVenuesResponse aux = new GetVenuesResponse();
            aux.setVenue_code(l.getId());
            aux.setVenue_name(l.getName());
            response.add(aux);
        }
        return response;
    }

    public List<GetArtistsResponse> get_artists() {
        List<GetArtistsResponse> response = new ArrayList<>();
        List<Artist> artistList = artistRepo.findAll();
        for(Artist a : artistList){
            GetArtistsResponse aux = new GetArtistsResponse();
            aux.setArtist_code(a.getId());
            aux.setArtist_name(a.getName());
            response.add(aux);
        }
        return response;
    }

    public List<GetEventsByPromoterResponse> get_events_by_promoter(String email) {
        List<GetEventsByPromoterResponse> response = new ArrayList<>();
        List<Event> eventsList = eventRepo.findEventsByPromoter(promoterRepo.findPromoterByEmail(email).get().getId());
        for(Event e : eventsList){
            if (e.getPromoter().getEmail().equals(email)){
                GetEventsByPromoterResponse aux = new GetEventsByPromoterResponse();

                aux.setEvent_id(e.getId());
                aux.setName(e.getName());
                aux.setCity(e.getLocation().getCity());
                aux.setVenue_name(e.getLocation().getName());

                // -- formatting Date --
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

                LocalDateTime ldt = e.getDate_start();
                String formattedString = ldt.format(formatter);  //12/12/2018 18:25:58

                // ---------------------

                aux.setDate(formattedString);
                
                response.add(aux);
            }
        }
        return response;
    }

    @GetMapping("/get_user")
    public AuthenticationResponse get_promoter(String email) {
        Promoter p = promoterRepo.findPromoterByEmail(email).get();
        return AuthenticationResponse
                .builder()
                .type("promoter")
                .name(p.getName())
                .build();
    }

    public void remove_event(RemoveEventRequest request){
        eventRepo.deleteById(request.getEvent_id());
    }

    @Transactional
    public void remove_suggestion(RemoveSugestionRequest request) {
        System.out.println("Falta fazer isto");
    }
}
