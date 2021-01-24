/* eslint-disable */
<template>
  <div class="BlogComponent col-3 " @click="selectBlog()">
    <div>
<h4 class="card-title" :contenteditable="state.editBlog" @blur="editBlog">
          {{ blogProp.title }}
        </h4>
<!-- <button aria-hidden="true" v-if="state.account.id == blogProp.creatorId" @click="state.editBlog = !state.editBlog">Edit</button> -->
        <button aria-hidden="true" v-if="state.account.id == blogProp.creatorId" @click="deleteBlog">Delete</button>
    <p class="card-text" v-if="blogProp.creator">
          Created By : {{ blogProp.creator.name }}
        </p>
        </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { commentService } from "../services/CommentService"
export default {
  name: 'BlogComponent',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editBlog: false
    })
    return {
      state,
      deleteBlog() {
        try {
          blogService.deleteBlog(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editBlog(e) {
        try {
          blogService.editBlog(props.blogProp.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      },
      selectBlog () {
        try {
          commentService.selectBlog(props.blogProp)
        }
        catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.BlogComponent{
  border-style: solid;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.BlogComponent :hover
{
  color: blue;
}
</style>