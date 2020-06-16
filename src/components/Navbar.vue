<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom">
    <a class="navbar-brand" href="#">
      <img
        src="img/icons/favicon-32x32.png"
        width="32"
        height="32"
        class="d-inline-block align-top"
        alt="ATIOP"
      />
      ATIOP
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Projects</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/general" class="nav-link">General</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/calend" class="nav-link">Calend</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>


<style scoped>
</style>
