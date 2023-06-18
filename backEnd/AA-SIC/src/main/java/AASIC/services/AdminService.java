package AASIC.services;

import AASIC.controllers.RegisterRequest;
import AASIC.model.Admin;
import AASIC.model.Promoter;
import AASIC.repositories.AdminRepo;
import AASIC.repositories.PromoterRepo;
import AASIC.requests.GetPromotersResponse;
import AASIC.requests.RemovePromoterRequest;
import AASIC.responses.AuthenticationResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepo adminRepo;
    private final PromoterRepo promoterRepo;

    public AuthenticationResponse get_admin(String email){
        Admin a = adminRepo.findAdminByEmail(email).get();
        return AuthenticationResponse
                .builder()
                .type("admin")
                .name(a.getName())
                .build();
    }

    public List<GetPromotersResponse> get_promoters() {

        List<Promoter> promoterList = promoterRepo.findAll();
        List<GetPromotersResponse> response = new ArrayList<>();

        for(Promoter p : promoterList){
            GetPromotersResponse aux = new GetPromotersResponse();
            aux.setId(p.getId());
            aux.setEmail(p.getEmail());
            aux.setName(p.getName());
            //aux.setPassword(p.getLanguage());

            response.add(aux);
        }
        return response;
    }

    @Transactional
    public void remove_promoter(RemovePromoterRequest request) {
        promoterRepo.removePromoterById(request.getPromoter_id());
    }
}
