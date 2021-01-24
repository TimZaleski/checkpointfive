/* eslint-disable */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
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

  async editBlog(blogId, newTitle) {
    const blogData = { title: newTitle }
    const res = await api.put('api/blogs/' + blogId, blogData)
    const blogInd = AppState.blogs.findIndex(b => b.id === blogId)
    AppState.blogs.splice(blogInd, 1, res.data)
  }

}

export const blogService = new BlogService()