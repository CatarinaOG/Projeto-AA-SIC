package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.config.JWTService;
import AASIC.requests.GetPromotersResponse;
import AASIC.requests.RemovePromoterRequest;
import AASIC.responses.AuthenticationResponse;
import AASIC.responses.GetArtistsResponse;
import AASIC.services.AdminService;
import AASIC.services.AuthenticationService;
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
@RequestMapping(path = "/api/admin")
public class AdminController {

    private final AuthenticationService authenticationService;
    private final JWTService jwtService;
    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.login_user(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> admin(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register_admin(request));
    }

    @PostMapping("/create_promoter")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register_promoter(request));
    }

    @GetMapping("/get_user")
    public ResponseEntity<AuthenticationResponse> get_admin(@RequestHeader(name="Authorization") String token){
        var jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(adminService.get_admin(email));
    }

    @GetMapping("/get_promoters")
    public ResponseEntity<List<GetPromotersResponse>> get_promoters(){
        return ResponseEntity.ok(adminService.get_promoters());
    }

    @PostMapping("/remove_promoter")
    public ResponseEntity<String> remove_promoter(@RequestBody RemovePromoterRequest request){
        adminService.remove_promoter(request);
        return ResponseEntity.ok("{\"confirmed\" : \"true\"}");
    }

}