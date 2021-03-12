<template>
  <div class="app-container">

    <AppHeader/>

    <AppSideNav/>

    <div class="app-content">
      <router-view />
    </div>

    <AppFooter/>

  </div>
</template>

<script>
  import AppHeader from '@/components/guest/AppHeader'
  import AppFooter from '@/components/guest/AppFooter'
  import AppSideNav from '@/components/guest/AppSideNav'
  export default {
    components: {
      AppHeader,
      AppSideNav,
      AppFooter
    },
    computed: {
      isSidebar() {
        return this.$store.getters['nav/toggleSidebar']
      }
    },
    watch: {
      '$route': function() {
        if (process.client && this.isSidebar && window.innerWidth < 768) {
          this.$store.dispatch('nav/toggleSidebar')
        }
      },
    }
  }
</script>

<style>
  html, body{
    margin: 0;
    height: 100%;
    width: 100%;
  }
  .app-container{
    height: 100%;
    position: relative;
    display: grid;
    grid-template: auto 1fr auto / 1fr;
  }
  .app-content{
    min-height: 100vh;
    padding: 24px;
    display: grid;
    /*align-items: center;*/
    /*justify-items: center;*/
  }
</style>