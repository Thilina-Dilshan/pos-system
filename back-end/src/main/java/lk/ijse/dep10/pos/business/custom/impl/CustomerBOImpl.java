package lk.ijse.dep10.pos.business.custom.impl;

import lk.ijse.dep10.pos.business.custom.CustomerBO;
import lk.ijse.dep10.pos.business.util.Transformer;
import lk.ijse.dep10.pos.dao.DAOFactory;
import lk.ijse.dep10.pos.dao.DAOType;
import lk.ijse.dep10.pos.dao.custom.CustomerDAO;
import lk.ijse.dep10.pos.dao.custom.OrderCustomerDAO;
import lk.ijse.dep10.pos.dto.CustomerDTO;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CustomerBOImpl implements CustomerBO {

    private final Transformer transformer = new Transformer();
    private final DataSource dataSource;
    private final CustomerDAO customerDAO = DAOFactory.getInstance().getDAO(DAOType.CUSTOMER);
    private final OrderCustomerDAO orderCustomerDAO = DAOFactory.getInstance().getDAO(DAOType.ORDER_CUSTOMER);

    public CustomerBOImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            customerDAO.setConnection(connection);


            return transformer.fromCustomerEntity(customerDAO.save(transformer.toCustomerEntity(customerDTO)));
        }
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            customerDAO.setConnection(connection);


            customerDAO.update(transformer.toCustomerEntity(customerDTO));
        }
    }

    @Override
    public void deleteCustomerById(int customerId) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            customerDAO.setConnection(connection);
            orderCustomerDAO.setConnection(connection);

            customerDAO.deleteById(customerId);
        }
    }

    @Override
    public Optional<CustomerDTO> findCustomerByIdOrContact(String idOrContact) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            customerDAO.setConnection(connection);

            return customerDAO.findCustomerByIdOrContact(idOrContact)
                    .map(transformer::fromCustomerEntity);
        }
    }

    @Override
    public List<CustomerDTO> findCustomers(String query) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            customerDAO.setConnection(connection);

            return customerDAO.findCustomers(query).stream()
                    .map(transformer::fromCustomerEntity).collect(Collectors.toList());
        }
    }
}