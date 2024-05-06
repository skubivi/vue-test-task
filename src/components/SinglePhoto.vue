<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PhotoModal from './PhotoModal.vue'
import viewsSvg from '../assets/views.svg'
import likesSvg from '../assets/likes.svg'

const props = defineProps({
  currentScroll: Number,
  imageUrl: String,
  likes: Number,
  views: Number
})

const photoRef = ref<HTMLDivElement | null>(null)
const left = ref(0)
const top = ref(0)

const scrolledTop = computed(() => {
  return top.value - (props.currentScroll ?? 0)
})

const showModal = ref(false)

const handleShowModal = () => {
  showModal.value = true
}

const handleCloseModal = () => {
  showModal.value = false
}

const updateInitialValues = () => {
  if (photoRef.value) {
    left.value = photoRef.value.offsetLeft
    top.value = photoRef.value.offsetTop
  }
}

onMounted(() => {
  if (photoRef.value) {
    left.value = photoRef.value.offsetLeft
    top.value = photoRef.value.offsetTop
  }

  window.addEventListener('resize', updateInitialValues)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateInitialValues)
})
</script>

<template>
  <div class="container">
    <div class="img-container" ref="photoRef">
      <img :src="imageUrl" @click="handleShowModal" />
      <PhotoModal
        v-show="showModal"
        :showModal="showModal"
        :initialTop="scrolledTop"
        :initialLeft="left"
        :imageUrl="imageUrl"
        @closeModal="handleCloseModal"
      />
    </div>
    <div class="image-info">
      <div class="likes-info">
        <div class="likes-icon-container">
          <img :src="likesSvg" />
        </div>
        <p>{{ likes }}</p>
      </div>
      <div class="views-info">
        <div class="views-icon-container">
          <img :src="viewsSvg" />
        </div>
        <p>{{ views }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
}

.image-info {
  width: 240px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
  justify-content: space-between;
  align-items: center;
}

.img-container {
  width: 300px;
  cursor: pointer;
  position: relative;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.likes-info,
.views-info {
  display: flex;
  gap: 5px;
}

.likes-icon-container,
.views-icon-container {
  max-width: 20px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  z-index: 1;
}
</style>
