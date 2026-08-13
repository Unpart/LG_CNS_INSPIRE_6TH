import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.service.BlogService;

public class ArrayApp {
    /*
    array? 꾸러미
    - 참조타입
    - 단일데이터 타입만 담는다.
    - 고정길이(실행시점에 re-sizing X)
    - 첨자번지에 대한 관리(0 ~ )
    - length 속성
    - []
    */
    public static void main(String[] args) {
        
        // int [] ary = new int[10];
        // ary[0] = 10;
        // ary[1] = 'a';

        String [] ary = new String[10];
        ary[0] = "A";

        for(int i = 0; i < ary.length; i++){
            System.out.println(ary[i]);
        }
        System.out.println();
        System.out.println("debug >>>> enhanced loop ~ ");
        // for(int data : ary){
        //     System.out.println(data);
        // }
        for(String data : ary){
            System.out.println(data);
        }

        /////////////////////////////////////////////////////////
        // Q) frontend로 부터 글 목록 요청이 들어 왔다면?

        BlogResponseDTO [] blogsAry = new BlogResponseDTO[10];

        // bulider 방식의 객체 생성
        BlogResponseDTO response = BlogResponseDTO.builder()
                                        .status(200)
                                        .message("good")
                                        .build();
        blogsAry[0] = response;
        blogsAry[1] = response;
        blogsAry[2] = response;

        for(int i = 0; i < blogsAry.length; i++){
            BlogResponseDTO data = blogsAry[i];
            if(data == null){
                break;
            }
            System.out.println(data.getMessage());
        }
        for(BlogResponseDTO data : blogsAry){
            if(data == null){
                break;
            }
            System.out.println(data.getMessage());
        }

        //////////////////////////////////////////////////////////

        BlogResponseDTO [] resultAry = BlogService.builder().build().blogs();

        System.out.println(">>>> main end");
  }
}
