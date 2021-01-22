/* eslint-disable */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    console.log(res)
    AppState.blogs = res.data
  }

  async getBlogById(blogId) {
    const res = await api.get('api/blogs/' + blogId)
    AppState.activeBlog = res.data
  }

  async createBlog(blogData) {
    const res = await api.post('api/blogs', blogData)
    console.log(res)
    // AppState.blogs.push(res.data)
    this.getBlogs()
  }

  async deleteBlog(blogId) {
    await api.delete('api/blogs/' + blogId)
    // this.getBlogs()
    const blogInd = AppState.blogs.findIndex(b => b.id === blogId)
    AppState.blogs.splice(blogInd, 1)
  }

  async editPost(postId, newTitle) {
    const postData = { title: newTitle }
    const res = await api.put('api/posts/' + postId, postData)
    // this.getPosts()
    const postInd = AppState.posts.findIndex(p => p.id === postId)
    AppState.posts.splice(postInd, 1, res.data)
  }
}

export const postService = new PostService()