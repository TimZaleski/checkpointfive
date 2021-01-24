/* eslint-disable */
import { AppState } from '../AppState'
import router from "../router"
import { api } from './AxiosService'

class CommentService {

  async getBlogCommentsById(blogId) {
    const res = await api.get('api/blogs/' + blogId + '/comments')
    AppState.comments = res.data
  }
  
  async createComment(commentData) {
    commentData.blog = AppState.activeBlog;
    const res = await api.post('api/comments', commentData)
    console.log(res)
    this.getBlogCommentsById(AppState.activeBlog.id);
  }

  async deleteComment(commentId) {
    await api.delete('api/comments/' + commentId)
    const commentInd = AppState.comments.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1)
  }

  async editComment(commentId, newBody) {
    const commentData = { body: newBody }
    const res = await api.put('api/comments/' + commentId, commentData)
    const commentInd = AppState.comments.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1, res.data)
  }
  async selectBlog (blog) {
    const res = await api.get('api/blogs/' + blog.id + '/comments')
    AppState.comments = res.data;
    AppState.activeBlog = blog;
    AppState.blogs = [];
    router.push('activeblog')
  }
}

export const commentService = new CommentService()