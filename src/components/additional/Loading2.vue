<template>
  <div class="lds-dual-ring"></div>
</template>

<style scoped>
.lds-dual-ring {
  /* display: inline-block;
  width: 16px;
  height: 16px; */
  margin-right: 18px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 22px;
  height: 22px;
  /* margin-top: 6px; */
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #9f9f9f transparent #9f9f9f transparent;
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