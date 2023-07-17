package lk.ijse.dep10.pos.dao.util;

import lk.ijse.dep10.pos.entity.Customer;

public class Mappers {
    public static final RowMapper<Customer> CUSTOMER_ROW_MAPPER = ((rs, rowNum) -> {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        String address = rs.getString("address");
        String contact = rs.getString("contact");
        return new Customer(id, name, address, contact);
    });

}
