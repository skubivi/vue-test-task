<script setup lang="ts">
defineProps({
  showModal: Boolean,
  initialTop: Number,
  initialLeft: Number,
  imageUrl: String
})

const emit = defineEmits({
  closeModal() {
    return true
  }
})

const handleCloseModal = () => {
  emit('closeModal')
}
</script>

<template>
  <Transition name="modal-window">
    <div
      class="modal-window"
      v-show="showModal"
      :style="{ '--initial-top': initialTop + 'px', '--initial-left': initialLeft + 'px' }"
    >
      <div class="modal-background" @click="handleCloseModal" v-if="showModal"></div>
      <Transition name="img-container">
        <div class="modal-container" v-show="showModal">
          <img :src="imageUrl" />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-window {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
}
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: black;
  opacity: 0.3;
  z-index: 2;
  cursor: pointer;
}

.modal-container {
  position: absolute;
  z-index: 3;
  height: 50dvh;
  width: 50dvw;
  top: 50dvh;
  left: 50dvw;
  transform: translate(-25dvw, -25dvh);
  background-color: black;
  cursor: default;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  object-position: 50% 50%;
}

.modal-window-enter-active,
.modal-window-leave-active {
  transition: all 0.5s ease;
}

.modal-window-enter-from,
.modal-window-leave-to {
  top: var(--initial-top);
  left: var(--initial-left);
}

.img-container-enter-active,
.img-container-leave-active {
  transition: all 0.5s ease;
}

.img-container-enter-from,
.img-container-leave-to {
  height: 300px;
  width: 300px;
  top: 0;
  left: 0;
  transform: translate(0, 0);
}
</style>
