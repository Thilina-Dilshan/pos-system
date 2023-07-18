package lk.ijse.dep10.pos.api;

import lk.ijse.dep10.pos.business.BOFactory;
import lk.ijse.dep10.pos.business.BOType;
import lk.ijse.dep10.pos.business.custom.CustomerBO;
import lk.ijse.dep10.pos.dto.CustomerDTO;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/customers")
@CrossOrigin
public class CustomerController {

    @Autowired
    private BasicDataSource pool;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customer) throws Exception {
        CustomerBO customerBO = BOFactory.getInstance().getBO(BOType.CUSTOMER, pool);
        return customerBO.saveCustomer(customer);
    }

    @PatchMapping("/{customerId}")
    public ResponseEntity<?> updateCustomer(@PathVariable("customerId") int customerId,
                                            @RequestBody CustomerDTO customer) {
        return null;
    }


}
