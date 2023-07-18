package lk.ijse.dep10.pos.business.custom;

import lk.ijse.dep10.pos.business.SuperBO;
import lk.ijse.dep10.pos.dto.ItemDTO;

import java.util.List;
import java.util.Optional;

public interface ItemBO extends SuperBO {

    void saveItem(ItemDTO itemDTO) throws Exception;

    void updateItem(ItemDTO itemDTO) throws  Exception;

    void deleteItemByCode(String itemCode) throws Exception;

    Optional<ItemDTO> findItemByCode(String itemCode) throws Exception;

    List<ItemDTO> findItems(String query) throws Exception;
}
