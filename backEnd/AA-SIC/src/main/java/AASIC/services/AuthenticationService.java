package AASIC.services;

import AASIC.config.JWTService;
import AASIC.controllers.AuthenticationRequest;
import AASIC.responses.AuthenticationResponse;
import AASIC.controllers.RegisterRequest;
import AASIC.model.Admin;
import AASIC.model.Promoter;
import AASIC.model.Role;
import AASIC.model.User;
import AASIC.repositories.AdminRepo;
import AASIC.repositories.UserRepo;
import AASIC.repositories.PromoterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PromoterRepo promoterRepo;
    private final AdminRepo adminRepo;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Com os dados recebidos no request vamos construir um novo utilizador
     * A este novo utilizador vamos atribuir a Role de User
     * TODO -> verificar se já existe algum email igual a este
     * @param request
     * @return
     */
    public AuthenticationResponse register_user(RegisterRequest request) {
        if (userRepo.findUserByEmail(request.getEmail()).isPresent()){
            /**
             * Aqui vamos devolver uma mensagem de erro para avisar que o email já está registado
             */
            return AuthenticationResponse.builder()
                    .token("Email já utilizado")
                    .build();
        }
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .language("English")
                .role(Role.USER)
                .build();

        userRepo.save(user);
        var jwt = jwtService.generateToken(user);

        /**
         * Aqui vamos devolver o token criado ao utilizador
         */
        return AuthenticationResponse.builder()
                .token(jwt)
                .name(user.getName())
                .language(user.getLanguage())
                .build();

    }

    public AuthenticationResponse login_user(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        User user = null;
        Promoter promoter = null;

        if (userRepo.findUserByEmail(request.getEmail()).isPresent()){
            user = userRepo.findUserByEmail(request.getEmail()).get();
            var jwt = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwt)
                    .type("user")
                    .profile_pic(user.getProfile_pic())
                    .name(user.getName())
                    .phone(user.getPhone())
                    .language(user.getLanguage())
                    .card_number(user.getCard_number())
                    .card_cvc(user.getCard_cvc())
                    .build();
        }

        if (promoterRepo.findPromoterByEmail(request.getEmail()).isPresent()) {
            promoter = promoterRepo.findPromoterByEmail(request.getEmail()).get();
            var jwt = jwtService.generateToken(promoter);
            return AuthenticationResponse.builder()
                    .token(jwt)
                    .type("promoter")
                    .name(promoter.getName())
                    .language(promoter.getLanguage())
                    .build();
        }
        if (adminRepo.findAdminByEmail(request.getEmail()).isPresent()) {
            Admin admin = adminRepo.findAdminByEmail(request.getEmail()).get();
            var jwt = jwtService.generateToken(admin);
            return AuthenticationResponse.builder()
                    .token(jwt)
                    .type("admin")
                    .name(admin.getName())
                    .language(admin.getLanguage())
                    .build();
        }

        return AuthenticationResponse.builder()
                .token("Email não está registado!")
                .build();

    }

    /**
     * TODO -> verificar se existe algum promoter com este email
     * @param request
     * @return
     */
    public AuthenticationResponse register_promoter(RegisterRequest request) {
        if (promoterRepo.findPromoterByEmail(request.getEmail()).isPresent()){
            /**
             * Aqui vamos devolver uma mensagem de erro para avisar que o email já está registado
             */
            return AuthenticationResponse.builder()
                    .token("Email já utilizado")
                    .build();
        }
        var promoter = Promoter.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .language("English")
                .role(Role.USER)
                .build();
        promoterRepo.save(promoter);
        var jwt = jwtService.generateToken(promoter);

        /**
         * Aqui vamos devolver o token criado ao utilizador
         */
        return AuthenticationResponse.builder()
                .token(jwt)
                .name(promoter.getName())
                .language(promoter.getLanguage())
                .build();
    }


    public AuthenticationResponse register_admin(RegisterRequest request) {
        if (adminRepo.findAdminByEmail(request.getEmail()).isPresent()){
            /**
             * Aqui vamos devolver uma mensagem de erro para avisar que o email já está registado
             */
            return AuthenticationResponse.builder()
                    .token("Email já utilizado")
                    .build();
        }
        var admin = Admin.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .language("English")
                .role(Role.ADMIN)
                .build();
        adminRepo.save(admin);
        var jwt = jwtService.generateToken(admin);

        /**
         * Aqui vamos devolver o token criado ao utilizador
         */
        return AuthenticationResponse.builder()
                .token(jwt)
                .name(admin.getName())
                .language(admin.getLanguage())
                .build();
    }

}
