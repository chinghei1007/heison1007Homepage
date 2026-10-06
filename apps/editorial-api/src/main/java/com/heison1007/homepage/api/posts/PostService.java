package com.heison1007.homepage.api.posts;

import java.util.List;
import org.springframework.stereotype.Service;


@Service 
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<PostSummary> listPosts() {
        return postRepository.findAll();
    }
    
}
