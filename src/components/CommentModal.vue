<template>
  <div class="CommentModal">
    <!-- Modal -->
    <div class="modal fade"
         id="commentModelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Comment
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createComment">
              <div class="form-group">
                <input type="text"
                       name="body"
                       id="body"
                       class="form-control"
                       placeholder="Enter comment"
                       aria-describedby="helpId"
                       v-model="state.newComment.body"
                >
                <button class="btn btn-success" type="submit">
                  Submit
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
import { commentService } from '../services/CommentService'
import $ from 'jquery'

export default {
  name: 'CommentModal',
  setup() {
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      async createComment() {
        try {
          await commentService.createComment(state.newComment)
           // @ts-ignore
        $("#commentModelId").modal('hide');
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>