<template>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div class="sidebar-brand">
        <router-link :to="{ name: 'AdminHome' }">stityx</router-link>
        <div id="close-sidebar">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="sidebar-header">
        <div class="user-pic">
          <img
            class="img-responsive img-rounded"
            src="@/assets/img/user.jpg"
            alt="User picture"
          >
        </div>
        <div class="user-info">
          <span class="user-name">
            <strong>Justin</strong><br>
            <span class="badge badge-pill badge-warning">Gold</span>
          </span>
          <span class="user-role">Administrator</span>
        </div>
      </div>

      <div class="sidebar-menu">
        <ul>
          <li class="header-menu">
            <span>General</span>
          </li>

          <li>
            <router-link :to="{ name: 'AdminFurnitures' }">
              <i class="fa fa-bed"></i>
              <span>Furnitures</span>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <div class="sidebar-footer">
      <a href="#">
        <i class="fa fa-bell"></i>
        <span class="badge badge-pill badge-warning notification">3</span>
      </a>
      <a href="#">
        <i class="fa fa-envelope"></i>
        <span class="badge badge-pill badge-success notification">7</span>
      </a>
      <router-link to="/settings">
        <i class="fa fa-cog"></i>
        <span class="badge-sonar"></span>
      </router-link>
      <a href="#">
        <i class="fa fa-power-off"></i>
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'dashboardSidebar',
    data() {
      return {
        pckLevel: ''
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
