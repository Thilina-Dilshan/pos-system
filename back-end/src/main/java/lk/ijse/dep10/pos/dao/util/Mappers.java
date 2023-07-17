package lk.ijse.dep10.pos.dao.util;

import lk.ijse.dep10.pos.entity.Customer;
import lk.ijse.dep10.pos.entity.Item;
import lk.ijse.dep10.pos.entity.OrderCustomer;

import java.math.BigDecimal;

public class Mappers {
    public static final RowMapper<Customer> CUSTOMER_ROW_MAPPER = ((rs, rowNum) -> {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        String address = rs.getString("address");
        String contact = rs.getString("contact");
        return new Customer(id, name, address, contact);
    });

    public static final RowMapper<Item> ITEM_ROW_MAPPER = (rs, rowNum) -> {
        String code = rs.getString("code");
        String description = rs.getString("description");
        int qty = rs.getInt("qty");
        BigDecimal unitPrice = rs.getBigDecimal("unit_price");
        return new Item(code, description, qty, unitPrice);
    };

    public static final RowMapper<OrderCustomer> ORDER_CUSTOMER_ROW_MAPPER = (rs, rowNum) -> {
        int orderId = rs.getInt("order_id");
        int customerId = rs.getInt("customer_id");
        return new OrderCustomer(orderId, customerId);
    };

}
