package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.config.JWTService;
import AASIC.requests.*;
import AASIC.responses.*;
import AASIC.services.AuthenticationService;
import AASIC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//import org.json.*;


@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
@CrossOrigin
public class UserController {

    private final AuthenticationService authService ;
    private final JWTService jwtService;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register_user(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.login_user(request));
    }

    @PostMapping("/profile_edit")
    public ResponseEntity<String> edit_profile_info(@RequestBody EditProfileRequest request, @RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        userService.edit_profile(request, email);
        return ResponseEntity.ok(email);
    }

    @PostMapping("/suggest_event")
    public ResponseEntity<String> suggest_event(@RequestBody SuggestEventRequest request, @RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        userService.suggest_event(request, email);
        return ResponseEntity.ok("Event Created!");
    }

    @GetMapping("/get_suggested_events")
    public ResponseEntity<List<GetSuggestedEventsResponse>> get_suggested_events(){
        return ResponseEntity.ok(userService.get_suggested_events());
    }

    @PostMapping("/sell_ticket")
    public ResponseEntity<String> sell_ticket(@RequestBody SellTicketRequest request, @RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        userService.sell_ticket(request, email);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @GetMapping("/get_tickets_listed_by_user")
    public ResponseEntity<List<GetTicketsListedByUserResponse>> get_tickets_listed_by_user(@RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(userService.get_tickets_listed_by_user(email));
    }

    @PostMapping("/remove_ticket_listing")
    public ResponseEntity<String> remove_ticket_listing(@RequestBody RemoveTicketListingRequest request){
        userService.remove_ticket_listing(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @PostMapping("/save_event")
    public ResponseEntity<String> save_event(@RequestBody SaveEventRequest request, @RequestHeader(name = "Authorization") String token) {
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        userService.save_event(request, email);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @GetMapping("/get_saved_events")
    public ResponseEntity<List<GetSavedEventsResponse>> get_saved_events(@RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(userService.get_saved_events(email));
    }

    @PostMapping("/follow_event")
    public ResponseEntity<String> follow_event(@RequestBody FollowEventRequest request, @RequestHeader(name = "Authorization") String token) {
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        userService.follow_event(request, email);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @GetMapping("/get_followed_events")
    public ResponseEntity<List<GetFollowedEventsReponse>> get_followed_events(@RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(userService.get_followed_events(email));
    }

    @PostMapping("/remove_followed_event")
    public ResponseEntity<String> remove_followed_event(@RequestBody RemoveFollowedEventRequest request){
        userService.remove_followed_event(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @PostMapping("/remove_saved_event")
    public ResponseEntity<String> remove_saved_event(@RequestBody RemoveSavedEventRequest request){
        userService.remove_saved_event(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @GetMapping("/get_user")
    public ResponseEntity<AuthenticationResponse> get_user(@RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        AuthenticationResponse response = userService.get_user(email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/buy_ticket")
    public ResponseEntity<String> buy_ticket(@RequestBody BuyTicketRequest request, @RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(userService.buy_ticket(request, email));
    }

    @GetMapping("/get_bought_tickets")
    public ResponseEntity<List<GetBoughtTicketsByUserResponse>> get_bought_tickets(@RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(userService.get_bought_tickets(email));
    }

    @PostMapping("/get_tickets_by_type_and_event")
    public ResponseEntity<List<GetTicketsTypeEventResponse>> get_tickets_type_event(@RequestBody GetTicketsTypeEventRequest request){
        return ResponseEntity.ok(userService.get_tickets_by_type_and_event(request));
    }

    @PostMapping("/get_sold_tickets_by_type_and_event")
    public ResponseEntity<List<GetTicketsTypeEventResponse>> get_sold_tickets_by_type_and_event(@RequestBody GetTicketsTypeEventRequest request){
        return ResponseEntity.ok(userService.get_sold_tickets_by_type_and_event(request));
    }

    @GetMapping("/events_suggested_for_selling_ticket")
    public ResponseEntity<List<EventsSuggestedForSellingTicketResponse>> get_events_suggested_for_selling_ticket(){
        return ResponseEntity.ok(userService.get_events_suggested_for_selling_ticket());
    }

    @GetMapping("/get_notifications")
    public ResponseEntity<List<GetNotificationResponse>> get_notifications_by_user(@RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(userService.get_notifications_by_user(email));
    }
}