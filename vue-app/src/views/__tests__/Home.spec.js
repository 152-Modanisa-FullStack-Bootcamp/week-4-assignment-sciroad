import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import VideoCard from "@/components/VideoCard"
import VueRouter from "vue-router";
import API from "../../api";
import flushPromises from "flush-promises";

jest.mock("@/api");

function mountComponentConfig() {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  return {
    localVue,
    router,
  };
}

describe("Home.vue", () => {
  it("should component exists", () => {
    const componentCfg = mountComponentConfig();
    const wrapper = shallowMount(Home, componentCfg);
    expect(wrapper.exists()).toBeTruthy();
  });
  
  it("should VideoCard exits", async () => {
    const componentCfg = mountComponentConfig();
    const video = {
      id: 1,
      title: "Vue.js Course for Beginners [2021 Tutorial]",
      description: "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications.",
      coverImage: "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
      hoverImage:"https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",

    };

    API.getVideoList.mockResolvedValue([video]);

    const wrapper = shallowMount(Home, componentCfg);
    await flushPromises();
    const videoCard=wrapper.findComponent(VideoCard);
    expect(videoCard.exists()).toBeTruthy();
  });
});
