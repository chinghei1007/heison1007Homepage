package com.heison1007.homepage.api.posts;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository 
public class InMemoryPostRepository implements PostRepository{
    
    private final List<PostSummary> posts = List.of(new PostSummary("message", "Welcome post"));

    @Override 
    public List<PostSummary> findAll(){
        return posts;
    }
}
