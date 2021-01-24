
<template>
  <div class="activeBlog container-fluid">
    <div class="row">
      <div class="col-12">
        {{ state.blog.body }}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import router from "../router"

export default {
  name: 'ActiveBlog',
  setup () {
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user)
    })
    return { state,
    back () {
      try {
        blogService.getBlogs();
        } catch (error) {
          console.error(error)
        }
      router.push('home');
      } 
      }
  }//,
  //components: { FullBlogComponent }
}
</script>

<style scoped>

</style>