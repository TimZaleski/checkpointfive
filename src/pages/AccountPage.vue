/* eslint-disable */
<template>
  <div class="account flex-grow-1 d-flex flex-column container-fluid">

    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#blogModelId">
          Create New Blog
        </button>
        <BlogModal />
      </div>
    </div>
    <div class="row mt-3">
      <BlogComponent v-for="blog in state.blogs" :key="blog.id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user),
      activeBlog: computed(() => AppState.activeBlog)
    })
    onMounted(async() => {
      try {
        await accountService.getAccountBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.account{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>