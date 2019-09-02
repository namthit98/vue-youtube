const KEY = "AIzaSyBoECSpqI3GlYIxrr7iyqq7iBEKu5u4_Uc";
const prefix = "https://www.youtube.com/embed/";
const data = JSON.parse(localStorage.getItem('myLibrary'))

const app = new Vue({
  el: "#app",
  data: {
    greeting: "Hello Vue!",
    term: "",
    searchingVideos: [],
    currentVideo: (data && data[0]) || null,
    myLibrary: data || [],
    state: 'home',
    showToast: false
  },
  methods: {
    search: async function() {
      const response = await axios.get("/search", {
        baseURL: "https://www.googleapis.com/youtube/v3/",
        params: {
          part: "snippet",
          maxResults: "10",
          key: KEY,
          q: this.term
        }
      });

      this.searchingVideos = response.data.items;
      this.currentVideo = this.searchingVideos[0];
      this.term = "";
    },
    setCurrentVideo: function(video) {
      this.currentVideo = video;
    },
    addToLibrary: function() {
      this.myLibrary.push(this.currentVideo);
      localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary))
      this.showToast = true;
      setTimeout(() => {
          this.showToast = false;
      }, 2000)
    },
    changeState: function(state) {
        this.state = state
    }
  }
});
