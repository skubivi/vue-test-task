<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SinglePhoto from './SinglePhoto.vue'
import { fetchImages } from '@/services/api/images'
import type { TImage } from '@/services/types/images'

const currentScroll = ref(0)

const images = ref<TImage[]>([])

const handleScroll = () => {
  currentScroll.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchImages().then((data) => (images.value = data.hits))
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="photo-list">
    <SinglePhoto
      v-for="(image, index) in images"
      :key="index"
      :currentScroll="currentScroll"
      :imageUrl="image.previewURL"
      :likes="image.likes"
      :views="image.views"
    />
  </div>
</template>

<style scoped>
.photo-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 90%;
  gap: 10px;
  justify-content: center;
}
</style>
