package lk.ijse.dep10.pos.business.custom.impl;

import lk.ijse.dep10.pos.business.custom.ItemBO;
import lk.ijse.dep10.pos.business.util.Transformer;
import lk.ijse.dep10.pos.dao.DAOFactory;
import lk.ijse.dep10.pos.dao.DAOType;
import lk.ijse.dep10.pos.dao.custom.ItemDAO;
import lk.ijse.dep10.pos.dao.custom.OrderDetailDAO;
import lk.ijse.dep10.pos.dto.ItemDTO;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ItemBOImpl implements ItemBO {

    private final DataSource dataSource;
    private final ItemDAO itemDAO = DAOFactory.getInstance().getDAO(DAOType.ITEM);
    private final OrderDetailDAO orderDetailDAO = DAOFactory.getInstance().getDAO(DAOType.ORDER_DETAIL);
    private final Transformer transformer = new Transformer();

    public ItemBOImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void saveItem(ItemDTO itemDTO) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            itemDAO.setConnection(connection);

            itemDAO.save(transformer.toItemEntity(itemDTO));
        }
    }

    @Override
    public void updateItem(ItemDTO itemDTO) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            itemDAO.setConnection(connection);

            itemDAO.update(transformer.toItemEntity(itemDTO));
        }
    }

    @Override
    public void deleteItemByCode(String itemCode) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            itemDAO.setConnection(connection);
            orderDetailDAO.setConnection(connection);

            itemDAO.deleteById(itemCode);
        }
    }

    @Override
    public Optional<ItemDTO> findItemByCode(String itemCode) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            itemDAO.setConnection(connection);

            return itemDAO.findById(itemCode).map(transformer::fromItemEntity);
        }
    }

    @Override
    public List<ItemDTO> findItems(String query) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            itemDAO.setConnection(connection);

            return itemDAO.findItems(query).stream().map(transformer::fromItemEntity).collect(Collectors.toList());
        }
    }
}
