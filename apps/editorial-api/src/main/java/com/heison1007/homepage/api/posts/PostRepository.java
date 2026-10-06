package com.heison1007.homepage.api.posts;

import java.util.List;

public interface PostRepository {
    List<PostSummary> findAll();
}
