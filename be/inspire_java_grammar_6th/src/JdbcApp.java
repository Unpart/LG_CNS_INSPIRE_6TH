import java.util.List;

import features.jdbc.MariadbDao;
import features.jdbc.domain.dto.DepartmentRequestDTO;
import features.jdbc.domain.dto.DepartmentResponseDTO;

public class JdbcApp {
    public static void main(String[] args) {
        MariadbDao dao = new MariadbDao();
        List<DepartmentResponseDTO> list = dao.departments();
        list.stream()
            .forEach(System.out::println);

        System.out.println();
        System.out.println(">>>> DML");

        DepartmentRequestDTO request = 
            DepartmentRequestDTO.builder()
            .dept_id("90")
            .dept_name("교육팀")
            .build();
        int flag = dao.update(request);
        System.out.println("result flag : " + flag);
    }
}
