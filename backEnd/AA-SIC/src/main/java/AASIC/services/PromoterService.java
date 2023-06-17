package AASIC.services;


import AASIC.model.*;
import AASIC.repositories.*;
import AASIC.requests.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Optional;

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
            event.setDate_start(new SimpleDateFormat("dd/MM/yyyy").parse(request.getEvent_date_end()));
            event.setDate_end(new SimpleDateFormat("dd/MM/yyyy").parse(request.getEvent_date_start()));
        }
        catch (Exception e){
            System.out.println("Date Format Incorrect!");
        }
        event.setAccepted(false);
        event.setLocation(locationRepo.findById(request.getEvent_venue_id()).get());
        Promoter promoter = promoterRepo.findPromoterByEmail(email).get();
        event.setPromoter(promoter);
        eventRepo.save(event);

        for (TicketTypeRequest ttr : request.getEvent_types()){
            TicketType tt = new TicketType();
            tt.setEvent(event);
            tt.setType(ttr.getTicket_type());
            tt.setPrice(ttr.getPrice());
            try{
                tt.setStart_date(new SimpleDateFormat("dd/MM/yyyy").parse(ttr.getType_date_start()));
                tt.setEnd_date(new SimpleDateFormat("dd/MM/yyyy").parse(ttr.getType_date_end()));
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


    public void create_artist(CreateArtistRequest request) {
        String artis_name = request.getName();
        Artist artist = new Artist();
        artist.setName(artis_name);
        artistRepo.save(artist);

    }

    public void create_category(CreateArtistRequest request) {
        String categary_name = request.getName();
        Category category = new Category();
        category.setName(categary_name);
        categoryRepo.save(category);

    }

    public void create_location(AddLocalRequest request) {
        Location location = new Location();
        location.setName(request.getName());
        location.setAddress(request.getAddress());
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setCapacity(request.getCapacity());
        location.setCity(request.getCity());
        locationRepo.save(location);
    }
}
