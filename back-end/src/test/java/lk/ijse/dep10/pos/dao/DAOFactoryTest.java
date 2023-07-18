package lk.ijse.dep10.pos.dao;

import lk.ijse.dep10.pos.dao.custom.*;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DAOFactoryTest {

    @Test
    void getInstance() {
        DAOFactory instance1 = DAOFactory.getInstance();
        DAOFactory instance2 = DAOFactory.getInstance();

        assertEquals(instance1,instance2);
    }

    @Test
    void getDAO() {
        CustomerDAO customerDAO = DAOFactory.getInstance().getDAO(DAOType.CUSTOMER);
        ItemDAO itemDAO = DAOFactory.getInstance().getDAO(DAOType.ITEM);
        OrderDAO orderDAO = DAOFactory.getInstance().getDAO(DAOType.ORDER);
        OrderDetailDAO orderDetailDAO = DAOFactory.getInstance().getDAO(DAOType.ORDER_DETAIL);
        OrderCustomerDAO orderCustomerDAO = DAOFactory.getInstance().getDAO(DAOType.ORDER_CUSTOMER);
        QueryDAO queryDAO = DAOFactory.getInstance().getDAO(DAOType.QUERY);


        /* Verify */
        assertNotNull(customerDAO);
        assertNotNull(itemDAO);
        assertNotNull(orderDAO);
        assertNotNull(orderDetailDAO);
        assertNotNull(orderCustomerDAO);
        assertNotNull(queryDAO);
    }
}