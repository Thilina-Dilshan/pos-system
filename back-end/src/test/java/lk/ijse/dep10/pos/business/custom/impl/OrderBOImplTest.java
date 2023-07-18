package lk.ijse.dep10.pos.business.custom.impl;

import lk.ijse.dep10.pos.TestConfig;
import lk.ijse.dep10.pos.business.BOFactory;
import lk.ijse.dep10.pos.business.BOType;
import lk.ijse.dep10.pos.business.custom.OrderBO;
import lk.ijse.dep10.pos.business.exception.BusinessException;
import lk.ijse.dep10.pos.business.exception.BusinessExceptionType;
import lk.ijse.dep10.pos.dto.CustomerDTO;
import lk.ijse.dep10.pos.dto.ItemDTO;
import lk.ijse.dep10.pos.dto.OrderDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringJUnitConfig(classes = TestConfig.class)
class OrderBOImplTest {

    @Autowired
    private EmbeddedDatabase embeddedDatabase;
    private OrderBO orderBO;

    @BeforeEach
    void setUp() {
        orderBO = BOFactory.getInstance().getBO(BOType.ORDER, embeddedDatabase);
    }

    @Test
    void placeOrderTest1() {
        /* Exercise */
        CustomerDTO fakeCustomer = new CustomerDTO(10, "Nuwan",
                "Matara", "055-2222222");
        ArrayList<ItemDTO> itemList = new ArrayList<>();
        itemList.add(new ItemDTO("123456", "Test Item 1", 5,
                new BigDecimal("1250.00")));
        itemList.add(new ItemDTO("456789", "Test Item 2", 5,
                new BigDecimal("2250.00")));
        OrderDTO orderDTO = new OrderDTO(fakeCustomer, LocalDateTime.now(), itemList);

        /* Verify */
        try {
            Integer orderId = orderBO.placeOrder(orderDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            if (e instanceof BusinessException){
                BusinessException be = (BusinessException) e;
                assertEquals(BusinessExceptionType.RECORD_NOT_FOUND, be.getType());
            }else{
                throw new RuntimeException(e);
            }
        }
    }

    @Test
    void placeOrderTest2() {
        /* Exercise */
        CustomerDTO fakeCustomer = new CustomerDTO(1, "Nuwan",
                "Matara", "055-2222222");
        ArrayList<ItemDTO> itemList = new ArrayList<>();
        itemList.add(new ItemDTO("123456", "Test Item 1", 5,
                new BigDecimal("1250.00")));
        itemList.add(new ItemDTO("456789", "Test Item 2", 5,
                new BigDecimal("2250.00")));
        OrderDTO orderDTO = new OrderDTO(fakeCustomer, LocalDateTime.now(), itemList);

        /* Verify */
        try {
            Integer orderId = orderBO.placeOrder(orderDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            if (e instanceof BusinessException){
                BusinessException be = (BusinessException) e;
                assertEquals(BusinessExceptionType.INTEGRITY_VIOLATION, be.getType());
            }else{
                throw new RuntimeException(e);
            }
        }
    }

}