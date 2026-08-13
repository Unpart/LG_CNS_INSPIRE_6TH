package features.blogs.repository;

import features.blogs.domain.dto.BlogResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
repository, dao
- data access logic
- JDBC를 기본으로해서 Object Relationship Mapping(mybatis, JPA) 확장
- 원격에 있는 database와 통신을 통해서 CRUD 작업을 전담하는 객체
*/
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class BlogRepository {
    
    private BlogResponseDTO [] list = new BlogResponseDTO[10];

    public BlogResponseDTO[] blogs() {
        System.out.println("debug >>>> BlogRepository blogs()");
        return list;
    } 
}
