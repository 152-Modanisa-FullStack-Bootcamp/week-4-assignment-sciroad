<template>
  <div class="video-item" @click="navigateToVideo" :data-id="video.id">
    <div class="video-img-wrapper">
      <img
        :src="hovered ? video.hoverImage : video.coverImage"
        @mouseover="hovered = !hovered"
        @mouseleave="hovered = !hovered"
        width="500px"
        height="300px"
        id="video-image"
        :alt="video.title"
      />
    </div>
    <h3 class="title">{{ video.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: {
    video: {
      id: Number,
      title: String,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },
  methods: {
    navigateToVideo() {
      this.$router.push({
        name: "Watch",
        query: {
          id: this.video.id,
        },
      });
    },
  },
};
</script>

<style>
.video-item {
  width:500px;
}
</style>
