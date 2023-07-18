package lk.ijse.dep10.pos.business.custom.impl;

import com.github.javafaker.Faker;
import lk.ijse.dep10.pos.TestConfig;
import lk.ijse.dep10.pos.business.BOFactory;
import lk.ijse.dep10.pos.business.BOType;
import lk.ijse.dep10.pos.business.custom.CustomerBO;
import lk.ijse.dep10.pos.dto.CustomerDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import static org.junit.jupiter.api.Assertions.*;

@SpringJUnitConfig(classes = TestConfig.class)
class CustomerBOImplTest {

    @Autowired
    private EmbeddedDatabase embeddedDatabase;
    private CustomerBO customerBO;

    @BeforeEach
    void setUp() {
        customerBO = BOFactory.getInstance().getBO(BOType.CUSTOMER, embeddedDatabase);
    }

    @Test
    void saveCustomer() throws Exception {
        Faker faker = new Faker();
        CustomerDTO customerDTO = new CustomerDTO(null, faker.name().fullName(),
                faker.address().streetAddress(), faker.regexify("0\\d{2}-\\d{7}"));
        CustomerDTO savedCustomerDTO = customerBO.saveCustomer(customerDTO);
        System.out.println(savedCustomerDTO);
        assertNotNull(savedCustomerDTO.getId());
    }

}