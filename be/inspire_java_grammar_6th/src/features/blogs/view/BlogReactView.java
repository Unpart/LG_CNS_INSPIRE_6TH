package features.blogs.view;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import features.blogs.facade.BlogFrontController;
import features.blogs.util.ResponseEntity;
import features.blogs.domain.dto.BlogResponseDTO;

public class BlogReactView {
    /*
    Scanner 데이터 입력 처리
    예외처리
    view has a FrontController
    */

    private Scanner scan;
    private BlogFrontController front;

    public BlogReactView(){
        scan = new Scanner(System.in);
        front = new BlogFrontController();
    }

    public void landingPage() {

        boolean isLoad = front.file("file.inspire", "load");
        System.out.println(isLoad ? "데이터 로딩완료!!" : "데이터 로딩 실패");
        
        while(true){
            System.out.println();
            System.out.println(">>>> Inspire Camp Blog Ver(1.0) <<<<");
            System.out.println("1. 전체검색");
            System.out.println("2. 게시글 상세보기");
            System.out.println("3. 입력화면");
            System.out.println("4. 수정화면");
            System.out.println("5. 게시글 삭제");
            System.out.println("6. 검색"); 
            System.out.println("99. 프로그램 종료");

            /*
            Q)
            - 사용자로부터 문자열 정수가 아닌 문자열이 입력된다면 예외발생!!
            - 예외처리를 통해서 메시지를 출력하고 다시 입력받을 수 있도록 흐름을 제어
            */
            System.out.print("원하시는 메뉴 번호를 입력하세요 : ");
            try {
                int number = Integer.parseInt(scan.nextLine());
                switch (number) {
                    case 01:
                        list();
                        break;
                    case 02:
                        read();
                        break;
                    case 03:
                        insert();
                        break;
                    case 04:
                        update();
                        break;
                    case 05:
                        delete();
                        break;
                    case 06:
                        search();
                        break;
                    case 99:
                        exit();
                        break;
                
                    default:
                        break;
                }
            } catch(Exception e) {
                System.out.println();
                e.printStackTrace();
                // System.out.println("ERR) 메뉴에 있는 숫자만 가능합니다!! 다시 확인요망");
            } 
            
        }
    }

    public void exit() {
        System.out.println();
        System.out.println(">>>> 작업된 내용을 저장하고 시스템을 종료하겠습니까?(y/n)");
        String yesOrNo = scan.nextLine();
        if(yesOrNo.equalsIgnoreCase("y")){
            String endPoint = "file.inspire";
            System.out.println(front.file(endPoint, "save") ? "데이터 저장 완료!!" : "데이터 저장 실패");
        }
        System.exit(1);
    }

    public void list() {
        System.out.println();
        System.out.println(">>>> 데이터 출력");
        String endPoint = "list.inspire";
        ResponseEntity<List<BlogResponseDTO>> response = front.list(endPoint);

        // stream API 출력 == json rendering (react)
        if(response.getCode() == 200){
            response.getData().stream()
                .forEach(System.out::println);
        }
        
    }

    public void read() {
        System.out.println();
        System.out.println(">>>> 상세페이지 정보");
        String endPoint = "read.inspire";
        System.out.print("키(blogId) 입력 : ");

        int blogId = Integer.parseInt(scan.nextLine());
        ResponseEntity<BlogResponseDTO> response = front.read(endPoint, blogId);
        System.out.println(response.getCode() == 200 ? response.getData() : response.getMessage());
    }

    public void search() {
        System.out.println();
        System.out.println(">>>> 검색페이지 정보");
        String endPoint = "search.inspire";
        /*
        Q) blog content 내용 중 해당 키워드를 포함하는 것들을 검색해서 가져와 본다면?
        - front controller search() 정의
        - SearchController 클래스를 정의하고 factory 에 search.inspire 등록 
        - BlogReactServiceImpl 클래스에 search() 메서드 정의하고 dao findByKeyword() 메서드를 호출
        - BlogReactDao 클래스에 findByKeyword() 구현
        */ 

        System.out.print("키워드 입력 : ");
        String keyword = scan.nextLine();

        ResponseEntity<List<BlogResponseDTO>> response = front.search(endPoint, keyword);
        response.getData().stream()
            .forEach(System.out::println);

    }

    public void insert() {
        System.out.println();
        System.out.println(">>>> 데이터 입력 화면");
        String endPoint = "insert.inspire";
        
        // react data = { title : xxxx, content : xxxx, email : xxxx}
        System.out.print("제목 : "); 
        String title = scan.nextLine();
        System.out.print("내용 : "); 
        String content = scan.nextLine();
        System.out.print("이메일 : ");
        String email = scan.nextLine();

        // axios.post("insert.inspire", data);
        ResponseEntity<Integer> response = front.insert(endPoint, title, content, email);
        System.out.println(response.getMessage());
    }

    public void update() {
        System.out.println();
        System.out.println(">>>> 데이터 수정 화면");
        String endPoint = "update.inspire";
        
        // react data = { title : xxxx, content : xxxx, email : xxxx}
        System.out.print("수정할 키(blogId) 입력 : ");
        int blogId = Integer.parseInt(scan.nextLine());

        System.out.print("제목 : "); 
        String title = scan.nextLine();
        System.out.print("내용 : "); 
        String content = scan.nextLine();

        // axios.post("update.inspire", data);
        ResponseEntity<Integer> response = front.update(endPoint, blogId, title, content);
        System.out.println(response.getMessage());

    }

    public void delete() {
        System.out.println();
        System.out.println(">>>> 데이터 삭제 화면");
        String endPoint = "delete.inspire";
        System.out.print("키(blogId) 입력 : ");

        int blogId = Integer.parseInt(scan.nextLine());
        ResponseEntity<Integer> response = front.delete(endPoint, blogId);
        System.out.println(response.getMessage());
    }
}
