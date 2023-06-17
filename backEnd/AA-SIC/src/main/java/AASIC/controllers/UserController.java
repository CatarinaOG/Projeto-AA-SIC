package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.config.JWTService;
import AASIC.requests.EditProfileRequest;
import AASIC.services.AuthenticationService;
import AASIC.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}