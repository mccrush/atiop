<template>
  <div>
    <img src="/img/ajax-loader.gif" alt="Loading data" class="pl-3" />
  </div>

  <!-- <div class="row">
    <div class="col-12 pt-4 d-flex justify-content-center">
      <div class="lds-dual-ring"></div>
    </div>
  </div>-->
</template>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fed;
  border-color: #fed transparent #fed transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>