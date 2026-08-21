package features.blogs.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.List;
import java.util.Optional;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.repository.BlogReactDao;
import lombok.ToString;

@ToString
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
        System.out.println("debug >>>> blog service read params : " + blogId);

        // Q) dao findByAll() 메서드 호출을 통해서 전달된 Optional 을 확인하고 객체 또는 null 반화놔는 구현
        // case 01
        // return dao.findById(blogId).orElse(null);

        // case 02
        // Optional<BlogResponseDTO> result = dao.findById(blogId);
        // if(result.isPresent()) {
        //     return result.get();
        // }
        // return null;

        // case 03
        return dao.findById(blogId).orElseThrow(() -> new RuntimeException(blogId + " 정보를 찾을 수 없습니다."));
    }
    
    @Override
    public List<BlogResponseDTO> search(BlogRequestDTO request) {
        System.out.println("debug >>>> blog service search params : " + request);
        return dao.findByKeyword(request);
    }

    @Override
    public int insert(BlogRequestDTO request) {
        System.out.println("debug >>>> blog service insert params : " + request);
        return dao.save(request);
    }

    @Override
    public int update(BlogRequestDTO request) {
        System.out.println("debug >>>> blog service insert params : " + request);
        return dao.update(request);
    }

    @Override
    public int delete(int blogId) {
        System.out.println("debug >>>> blog service delete params : " + blogId);
        return dao.delete(blogId);
    }

    @Override
    public boolean saveToFile() {
        System.out.println("debug >>>> blog service file save : ");
        String path = "./blogs.txt";
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(new File(path)))){
            oos.writeObject(dao.findByAll());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean loadToFile() {
        System.out.println("debug >>>> blog service file load : ");
        String path = "./blogs.txt";
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(new File(path)))){
            dao.setBlogs((List<BlogResponseDTO>)ois.readObject());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    
}
