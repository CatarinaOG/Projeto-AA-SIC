package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddLocalRequest {
    private String name;
    private String address;
    private String latitude;
    private String longitude;
    private int capacity;
    private String city;
    private String map;
}

/**
 * {
 * 	"name": "Theatro Circo",
 * 	"address" : "Rua AAA",
 * 	"latitude": 12.324,
 * 	"longitude" : 123.45,
 * 	"capacity" : 3000,
 * 	"city" : "Braga",
 * }
 */