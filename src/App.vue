<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">POKEMON PHC</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'posts.index'}" class="nav-link">My Pokemon List</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- render vue router -->
    <router-view></router-view>

  </div>
</template>

<script>
  export default {

  }
</script>

<style>
 body {
   background-color: lightgray !important;
 }
 .mt-custom {
   margin-top: 110px;
 }
</style>