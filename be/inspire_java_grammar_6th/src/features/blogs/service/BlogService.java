package features.blogs.service;

import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.repository.BlogRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class BlogService {

    private String msg;

    public BlogResponseDTO[] blogs() {
        System.out.println("debug >>>> BlogService blogs()");
        return BlogRepository.builder().build().blogs();
    } 
}
