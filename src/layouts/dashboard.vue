<template>
  <div class="page-wrapper chiller-theme toggled">
    <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
      <i class="fas fa-bars"></i>
    </a>
    <DashboardSidebar />
    <main class="page-content">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import dashboardInit from '@/mixins/dashboardInit'
  import DashboardSidebar from '@/components/dashboard/Sidebar'


  export default {
    mixins: [dashboardInit],
    components: {
      DashboardSidebar
    },
    watch: {
      '$route': function () {
        if(window.innerWidth < 767) {
          $(".page-wrapper").removeClass("toggled");
        }
      }
    }
  }


</script>

<style>
  @import "../assets/css/dashboard.css";
</style>

