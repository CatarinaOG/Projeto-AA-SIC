package AASIC.controllers;

import AASIC.config.JWTService;
import AASIC.requests.AddEventRequest;
import AASIC.requests.AddLocalRequest;
import AASIC.requests.CreateArtistRequest;
import AASIC.requests.RemoveEventRequest;
import AASIC.responses.*;
import AASIC.services.AuthenticationService;
import AASIC.services.PromoterService;
import AASIC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value ="/api/promoter")
@CrossOrigin(origins = "http://localhost:3000")
public class PromoterController {


    private final AuthenticationService authService;
    private final JWTService jwtService;
    private final UserService userService;
    private final PromoterService promoterService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.login_user(request));
    }

    @PostMapping("/add_event")
    public ResponseEntity<String> create_event(@RequestBody AddEventRequest request, @RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        promoterService.create_event(request, email);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    /**
     * TODO -> verificar se o artista já existe ou não
     * @param request
     * @param token
     * @return
     */
    @PostMapping("/create_artist")
    public ResponseEntity<String> create_artist(@RequestBody CreateArtistRequest request, @RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        promoterService.create_artist(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    /**
     * TODO -> Falta verificar se a categoria já existe ou não
     * @param request
     * @return
     */
    @PostMapping("/create_category")
    public ResponseEntity<String> create_category(@RequestBody CreateArtistRequest request){
        promoterService.create_category(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @PostMapping("/add_location")
    public ResponseEntity<String> add_location(@RequestBody AddLocalRequest request){
        promoterService.create_location(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

    @GetMapping("/get_categories")
    public ResponseEntity<List<GetCategoriesResponse>> get_categories() {
        return ResponseEntity.ok(promoterService.get_categories());
    }

    @GetMapping("/get_venues")
    public ResponseEntity<List<GetVenuesResponse>> get_venues(){
        return ResponseEntity.ok(promoterService.get_venues());
    }

    @GetMapping("/get_artists")
    public ResponseEntity<List<GetArtistsResponse>> get_artists(){
        return ResponseEntity.ok(promoterService.get_artists());
    }

    @GetMapping("get_events_by_promoter")
    public ResponseEntity<List<GetEventsByPromoterResponse>> get_events_by_promoter(@RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(promoterService.get_events_by_promoter(email));
    }

    @GetMapping("/get_user")
    public ResponseEntity<AuthenticationResponse> get_promoter(@RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(promoterService.get_promoter(email));
    }

    @PostMapping("/remove_event")
    public ResponseEntity<String> remove_event(RemoveEventRequest request){
        promoterService.remove_event(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }
}
