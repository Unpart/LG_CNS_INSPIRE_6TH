package features.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import features.jdbc.domain.dto.DepartmentRequestDTO;
import features.jdbc.domain.dto.DepartmentResponseDTO;

public class MariadbDao {

    /*
    package : java.sql.*
    JDBC 절차
    - 1. 드라이버 관리 작업 - Driver loading
    - 2. 연결 작업 - Connection
    - 3. SQL 문장을 수행하기 위한 작업 - Statement(query)
    - 4. 실행 작업 - execute
    - 5. 결과를 핸들링하는 작업 - ResultSet
    - 6. 연결 종료 - close
    */

    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    private static final String USER = "root";
    private static final String PASSWORD = "1234";
    private static final String URL = "jdbc:mariadb://localhost:3306/lgcns";


    public MariadbDao() {
        try {
            Class.forName(DRIVER);
            System.out.println("debug >>>> driver loading ok!!");
        } catch (Exception e) {
           e.printStackTrace();
        } finally {
            try {
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public List<DepartmentResponseDTO> departments() {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rset = null;
        String sql = """
                select * 
                from department
                """;
        List<DepartmentResponseDTO> list = new ArrayList<>();
        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("debug >>>> conn ok!!" + conn);

            pstmt = conn.prepareStatement(sql);
            rset = pstmt.executeQuery();
            while(rset.next()) {
                list.add(DepartmentResponseDTO.builder()
                    .dept_id(rset.getString(1))
                    .dept_name(rset.getString(2))
                    .loc_id(rset.getString(3))
                    .build());
            }
        } catch (Exception e) {
           e.printStackTrace();
        } finally {
            try {
                if(conn != null) {
                    conn.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return list;
    }

    // DML(insert, update, delete)
    public int update(DepartmentRequestDTO request) {
        Connection          conn  = null ; 
        PreparedStatement   pstmt = null ; 
        String  sql = """
                update  department
                set     dept_name = ?
                where   dept_id   = ?
                """;  
        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD); 
            System.out.println("debug >>>> conn ok!! " + conn); 

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, request.getDept_name());
            pstmt.setString(2, request.getDept_id()) ;
            return pstmt.executeUpdate();
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try{
                if( conn != null) { conn.close(); } 
            } catch(Exception e) {
                e.printStackTrace(); 
            }
        }
        return 0 ;
    }
}
