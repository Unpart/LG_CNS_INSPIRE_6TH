package features.blogs.service;

import java.util.List;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.repository.BlogReactDao;

public class BlogReactServiceImpl implements BlogReactService{

    private BlogReactDao dao;
    public BlogReactServiceImpl(BlogReactDao dao) {
        this.dao = dao;
    }

    @Override
    public List<BlogResponseDTO> list() {
        System.out.println("debug >>>> blog service list");
        return dao.findByAll();
    }

    @Override
    public BlogResponseDTO read(int blogId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'read'");
    }

    @Override
    public int insert(BlogRequestDTO request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insert'");
    }

    @Override
    public int update(BlogRequestDTO request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public int delete(int blogId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public List<BlogResponseDTO> search(BlogRequestDTO request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'search'");
    }
    
}
