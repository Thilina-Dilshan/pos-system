package lk.ijse.dep10.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    @NotBlank(message = "Item code can't be empty or null")
    @Pattern(regexp = "\\d+", message = "Invalid item code")
    private String code;
    @NotBlank(message = "Description can't be empty or null")
    private String description;
    @NotNull(message = "Qty. can't be empty or null")
    @Min(value = 0, message = "Qty. can't be a negative value")
    private int qty;
    @NotNull(message = "Unit Price can't be empty or null")
    @Min(value = 0, message = "Unit price can't be a negative value")
    private BigDecimal unitPrice;
}
