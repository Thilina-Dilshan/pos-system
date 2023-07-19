package lk.ijse.dep10.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Integer id;
    @NotBlank(message = "name can't be empty or null")
    @Pattern(regexp = "[A-Za-z ]+" , message = "Invalid name")
    private String name;
    @NotBlank(message = "address can't be empty or null")
    @Length(min = 3, message = "Invalid address")
    private String address;
    @NotBlank(message = "contact number can't be empty or null")
    @Pattern(regexp = "\\d{3}-\\d{7}")
    private String contact;
}
