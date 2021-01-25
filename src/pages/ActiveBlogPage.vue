
<template>
  <div class="activeBlog container-fluid">
    <div class="row">
      <div v-if="state.loaded" class="col-12"  :contenteditable="state.editBlog" @blur="editBlog">
        {{ state.blog.body }}
      </div>
      <div v-if="state.loaded">
      <button aria-hidden="true" v-if="state.account.id == state.blog.creatorId" @click="state.editBlog = !state.editBlog">Edit</button>
      </div>
    </div>
    <div class="row">
      <div v-if="state.loaded" class="col-12">
        <h3>Author: {{ state.blog.creator.name }}</h3>
        <hr>
      </div>
    </div>
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#commentModelId">
          Create New Comment
        </button>
        <CommentModal />
      </div>
    </div>
    <hr>
    <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
    <div class="row">
      <div class="col-12">
        <button aria-hidden="true" @click="back">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { blogService } from '../services/BlogService'
import router from "../router"
import { commentService } from "../services/CommentService"

export default {
  name: 'ActiveBlog',
  setup () {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      loaded: false,
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user),
      editBlog: false
    })
     onMounted(async () => {
      try {
        await blogService.getBlogById(route.params.id)
        await commentService.getBlogCommentsById(route.params.id)
      } catch (error) {
        console.error(error)
      } finally {
        state.loaded = true
      }
    })
    return { state,
    back () {
      try {
        blogService.getBlogs();
        } catch (error) {
          console.error(error)
        }
      router.push('home');
      },
      editBlog(e) {
        try {
          blogService.editBlog(AppState.activeBlog.id, e.target.innerText)
        } catch (error) {
          console.log(error)
        }
      }
      }
  }//,
  //components: { FullBlogComponent }
}
</script>

<style scoped>

</style>