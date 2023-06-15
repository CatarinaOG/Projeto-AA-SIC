package AASIC.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;


/**
* Esta classe vai ser utilizada para manipular tokens JWT
* Para isso, é necessário incluir novas dependencias na nossa aplicação
* */

@Service // esta anocação indica que esta classe será um bean gerido pela framework
public class JWTService {

    /**
    * Temos de gerar uma chave secreta
    * Para isso vamos utilizar uma ferramente online
    * */
    private static final String SECRET_KEY = "f9793d397bf0380500db7c55c7fb032b99ed5f2219224e5092be3198370cb301";
    public String extractUsername(String token) {
        return null;
    }

    /**
    * As claims fazem parte da estrutura do jwt, neste site tem exemplos https://jwt.io/
    * Com este método vamso extrair todas as claims do jwt
    * As claims são utilizadas para integrar informação nos jwt (mais ou menos isto)
    * */

    private Claims extractAllClaims(String token){
        /**
         * Uma signing Key é um segredo que é utilizado para "assinar" digitalmente um jwt
         * É utilizada para verificar que o emissor do jwt é realmente quem se pensa ser
         * Esta signing Key é gerada utilizando um algoritmo que é especificado no header do jwt
         * O tipo de algoritmo e o tamanho da key depende dos requisitos de segurança da aplicação
         * - Autalmente o mínimo razoável para o tamnaho é de 256
         */

        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes); // este é um dos algoritmos utilizados para criar as chaves do jwt
    }
}
