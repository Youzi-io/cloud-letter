<template>
  <div class="session">
    <BaseContainer>
      <template #aside>
        <div class="upper">
          <el-input v-model="search" style="width: 190px" placeholder="搜索">
            <template #prefix>123</template>
          </el-input>
        </div>
      </template>
      <template #main></template>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import BaseContainer from '@renderer/components/BaseContainer/index.vue'
import { ref } from 'vue'

const search = ref('')
</script>

<style lang="scss" scoped>
.session {
  height: 100%;
}
</style>
