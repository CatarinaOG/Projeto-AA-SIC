package AASIC.controllers;

import AASIC.config.JWTService;
import AASIC.requests.AddEventRequest;
import AASIC.requests.EditProfileRequest;
import AASIC.services.AuthenticationService;
import AASIC.services.PromoterService;
import AASIC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value ="/api/promoter")
@CrossOrigin
public class PromoterController {


    private final AuthenticationService authService;
    private final JWTService jwtService;
    private final UserService userService;
    private final PromoterService promoterService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register_promoter(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.login_promoter(request));
    }

    @PostMapping("/add_event")
    public ResponseEntity<String> create_event(@RequestBody AddEventRequest request, @RequestHeader(name = "Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        promoterService.create_event(request, email);
        return ResponseEntity.ok("\"confirmed\" : \"true\"");
    }


}
