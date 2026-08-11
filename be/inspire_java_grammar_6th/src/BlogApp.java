import features.blogs.domain.dto.BlogRequestDTO;

public class BlogApp {
    public static void main(String[] args) {
        System.out.println(">>>> new 연산자를 이용한 객체생성");
        // BlogRequestDTO request = new BlogRequestDTO();
        // BlogRequestDTO request 
        //     = new BlogRequestDTO(1,"title","content","email");

        System.out.println();
        System.out.println(">>>> Builder를 이용한 객체생성");
        BlogRequestDTO request = BlogRequestDTO.builder()
                                    .title("자바 첫날입니다.")
                                    .content("재미있다.")
                                    .email("jslim9413@naver.com")
                                    .build();
        request.setTitle("조기퇴근");
        System.out.println("title :" + request.getTitle());
    }
}
