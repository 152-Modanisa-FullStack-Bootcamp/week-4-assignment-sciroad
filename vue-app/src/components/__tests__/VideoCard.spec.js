import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import VideoCard from "@/components/VideoCard.vue";
import VueRouter from "vue-router";

function mountComponentConfig() {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  return {
    localVue,
    router,
    propsData: {
      video: {},
    },
  };
}

describe("VideoCard.vue", () => {
  it("should render correct contents", () => {
    const componentCfg = mountComponentConfig();
    const wrapper = shallowMount(VideoCard, componentCfg);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render correctly", () => {
    const componentCfg = mountComponentConfig();

    const video = {
      id: 1,
      title: "Vue.js Course for Beginners [2021 Tutorial]",
      description:  "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications.",
      coverImage: "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
      hoverImage:"https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",

    };
    componentCfg.propsData = {
      video,
    };

    const wrapper = mount(VideoCard, componentCfg);
    expect(wrapper.find("img").attributes("src")).toBe(video.coverImage);
    expect(wrapper.find("h3").text()).toBe(video.title);
  });

  it("when user click video should navigate to video watch page", async () => {
    const navigateToVideo = jest.spyOn(VideoCard.methods, "navigateToVideo");

    const video = {
      id: 1,
    };

    let routerPushMock = jest.fn();

    const wrapper = shallowMount(VideoCard, {
      propsData: {
        video,
      },
      mocks: {
        $router: {
          push: routerPushMock,
        },
      },
    });

    await wrapper.trigger("click");

    expect(navigateToVideo).toBeCalled();
    expect(routerPushMock).toHaveBeenCalledWith({
      name: "Watch",
      query: {
        id: video.id,
      },
    });
  });

  it("when video img hovered then should show hover image", async () => {
    const video = {
      id: 1,
      coverImage:
        "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
      hoverImage:
        "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
    };

    const wrapper = mount(VideoCard, {
      propsData: {
        video,
      },
    });

    const coverImage = wrapper.find("#video-image");
    expect(coverImage.attributes("src")).toBe(video.coverImage);
    await coverImage.trigger("mouseover");
    expect(coverImage.attributes("src")).toBe(video.hoverImage);
  });
});
