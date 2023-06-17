package AASIC.services;

import AASIC.model.User;
import AASIC.repositories.UserRepo;
import AASIC.requests.EditProfileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

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
}
