<template>
  <div class="home">
    <Header />

    <div class="videos-container">
      <VideoCard
        class="video-wrapper"
        :video="video"
        v-for="video in videos"
        :key="video.id"
      />
    </div>
  </div>
</template>

<script>
import API from "@/api";
import Header from "@/components/Header.vue";
import VideoCard from "@/components/VideoCard.vue";

export default {
  name: "Home",
  components: {
    Header,
    VideoCard,
  },
  data() {
    return {
      videos: [],
    };
  },
  async created() {
    this.videos = await API.getVideoList();
  },
};
</script>
<style scoped>
.videos-container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px
}
</style>
