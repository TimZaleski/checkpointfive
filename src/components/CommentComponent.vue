/* eslint-disable */
<template>
    <div class="row">
    <div class="col-12 ">
      

<div class="row">
    <div class="col-12">
    <h4>
          {{ commentProp.creator.name }} </h4>
    </div>
    </div>
      <div class="row">
    <div class="col-12">
    <p v-if="commentProp.creator" :contenteditable="state.editComment" @blur="editComment">
          {{ commentProp.body }} </p>
    </div>
    </div>

    <div class="row">
    <div class="col-12">
        <button aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="state.editComment = !state.editComment">Edit</button>
        <button aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="deleteComment">Delete</button> 
    </div>
    </div>

    </div>
    </div>
  <hr>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editComment: false
    })
    return {
      state,
      deleteComment() {
        try {
          commentService.deleteComment(props.commentProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editComment(e) {
        try {
          commentService.editComment(props.commentProp.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.CommentComponent{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
</style>