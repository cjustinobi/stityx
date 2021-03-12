
export default {
  data() {
    return {
      windowWidth: ''
    }
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  mounted() {

    window.addEventListener('resize', this.getWindowWidth);

      //Init
    this.getWindowWidth()
  }
}