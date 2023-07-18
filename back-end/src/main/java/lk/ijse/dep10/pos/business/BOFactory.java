package lk.ijse.dep10.pos.business;

import lk.ijse.dep10.pos.business.custom.impl.CustomerBOImpl;

import javax.sql.DataSource;

public class BOFactory {

    private static BOFactory boFactory;

    private BOFactory() {
    }

    public static BOFactory getInstance() {
        return (boFactory == null) ? (boFactory = new BOFactory()) : boFactory;
    }

    public <T extends SuperBO> T getBO(BOType boType, DataSource dataSource) {
        switch (boType) {
            case CUSTOMER:
                return (T) new CustomerBOImpl(dataSource);
            default:
                throw new RuntimeException("Invalid BOType");
        }
    }
}
