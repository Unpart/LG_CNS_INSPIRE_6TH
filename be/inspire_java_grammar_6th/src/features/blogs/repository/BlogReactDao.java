package features.blogs.repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import lombok.ToString;

@ToString
public class BlogReactDao {
    List<BlogResponseDTO> blogs;

    public BlogReactDao() {
        blogs = new ArrayList<>(List.of(
            BlogResponseDTO.builder()
            .blogId(1).title("react").content("state").email("lim")
            .viewCnt(10).build(),
            BlogResponseDTO.builder()
            .blogId(2).title("java").content("oop").email("kim")
            .viewCnt(20).build(),
            BlogResponseDTO.builder()
            .blogId(3).title("spring").content("mybatis").email("lee")
            .viewCnt(30).build(),
            BlogResponseDTO.builder()
            .blogId(4).title("docker").content("devops").email("park")
            .viewCnt(40).build(),
            BlogResponseDTO.builder()
            .blogId(5).title("msa").content("kafka").email("lim")
            .viewCnt(50).build()

        ));
    }

    // 참조복사(deep copy)
    public void setBlogs(List<BlogResponseDTO> blogs){
        this.blogs = blogs;
    }

    public List<BlogResponseDTO> findByAll() {
        System.out.println("debug >>>> blog dao findByAll()");
        return blogs;
    }

    public Optional<BlogResponseDTO> findById(int blogId) {        
        System.out.println("debug >>>> blog dao findById() params : " + blogId );

        // Q) stream 이용해서 filter 해서 찾은 객체를 반환
        return blogs.stream()
            .filter(blog -> blog.getBlogId() == blogId)
            .findAny();
    }

    public List<BlogResponseDTO> findByKeyword(BlogRequestDTO request) {        
        System.out.println("debug >>>> blog dao findByKeyword() params : " + request );

        // Q) stream 이용해서 filter 해서 찾은 객체를 반환
        return blogs.stream()
            .filter(blog -> blog.getTitle().contains(request.getKeyword()) 
                            ||  blog.getContent().contains(request.getKeyword()))
            .toList();
    }

    public int save(BlogRequestDTO request) {
        System.out.println("debug >>>> blog dao save params : " + request);
        /*
        blogId stream 이용한 generator
        hint)
        Q) blogId = stream sorted blogId reversed + 1 
        */        
        int blogId = blogs.stream()
                          .map( BlogResponseDTO::getBlogId )
                          .sorted( Comparator.reverseOrder() )
                          .findFirst()
                          .orElse(0) + 1 ;
        BlogResponseDTO response = BlogRequestDTO.toEntity(request);
        response.setBlogId(blogId);

        blogs.add(response);
        return 0;
    }

    public int delete(int blogId) {
        System.out.println("debug >>>> blog dao delete params : " + blogId);
        boolean removed = blogs.removeIf(blog -> blog.getBlogId() == blogId);
        return removed ? 1 : 0;
    }

    public int update(BlogRequestDTO request) {
        System.out.println("debug >>>> blog dao update params : " + request);

        // Q) SQL : update title = request.getTitle(), content = request.getContent()
        //          where blogId = request.getBlogId()
        Optional<BlogResponseDTO> result = blogs.stream()
            .filter(blog -> blog.getBlogId() == request.getBlogId())
            .findAny();
        if (result.isPresent()) {
            BlogResponseDTO blog = result.get();
            blog.setTitle(request.getTitle());
            blog.setContent(request.getContent());
            return 1;
        }
        return 0;
    }
}
 