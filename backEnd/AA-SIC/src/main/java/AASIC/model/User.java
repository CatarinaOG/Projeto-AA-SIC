package AASIC.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="user")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "password")
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name = "profile_pic")
    private String profile_pic;
    @Column(name = "language")
    private String language;
    @Column(name="card_number")
    private String card_number;
    @Column(name="card_cvc")
    private String card_cvc;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Ad> ads;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SuggestedEvent> suggested_events; // são os eventos que o utilizador guarda
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<EventFollowed> events_followed; // isto deverá ser events followed. events wanted será um atributo do event para ver quantas pessoas o seguem

    /*
    * Os Setters e Getters esão definidos com a anotação @Data do lombok
    * Os construtores também esão definidos pelas anotações do lombok, podemos mudar depois se for preciso
    * Para se começar a usar o spring security nos video que vi fala na necessidade de definir um objeto userDetails
    * Uma das coisas que é dito que é boa prática é fazer com que o nosso user implemente o UserDetails
    * Os próximos métodos referem-se ao userDetails
    * O Role é necessário para atribuir permissões, para já só existe os roles de USER e ADMIN
    *
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}