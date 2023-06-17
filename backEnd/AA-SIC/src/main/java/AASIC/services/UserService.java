package AASIC.services;

import AASIC.model.Event;
import AASIC.model.SuggestedEvent;
import AASIC.model.User;
import AASIC.repositories.EventRepo;
import AASIC.repositories.SuggestedEventRepo;
import AASIC.repositories.UserRepo;
import AASIC.requests.EditProfileRequest;
import AASIC.requests.SuggestEventRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final EventRepo eventRepo;
    private final SuggestedEventRepo suggestedEventRepo;

    public void edit_profile(EditProfileRequest request, String email) {
        User user = userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found."));

        if(!request.getEmail().equals("null")) user.setEmail(request.getEmail());
        if(!request.getPhone().equals("null")) user.setPhone(request.getPhone());
        if(!request.getPassword().equals("null")) user.setPassword(request.getPassword());
        if(!request.getLanguage().equals("null")) user.setLanguage(request.getLanguage());
        if(!request.getCard_number().equals("null")) user.setCard_number(request.getCard_number());
        if(!request.getCard_cvc().equals("null")) user.setCard_cvc(request.getCard_cvc());

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
}
