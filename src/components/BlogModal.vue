<template>
  <div class="BlogModal">
    <!-- Modal -->
    <div class="modal fade"
         id="blogModelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Blog
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="formatForm"  @submit.prevent="createBlog">
              <div class="form-group">
                <input type="textarea
                "
                       name="title"
                       id="title"
                       class="form-control"
                       placeholder="Blog Title"
                       aria-describedby="helpId"
                       v-model="state.newBlog.title"
                >
                <textarea id="body" name="body" rows="8" placeholder="Blog Content" class="form-control"
                       aria-describedby="helpId" cols="50" v-model="state.newBlog.body">
                </textarea>
                <button class="btn btn-success" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger'
import { reactive } from 'vue'
import { blogService } from '../services/BlogService'
import $ from 'jquery'

export default {
  name: 'BlogModal',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      async createBlog() {
        try {
          await blogService.createBlog(state.newBlog)
          // @ts-ignore
        $("#blogModelId").modal('hide');
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
#formatForm{
    display: inline;
}
</style>