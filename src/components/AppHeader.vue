<template>
  <div class="container">
    <div class="text-center mt-5 mb-5">
      <h1>{{ title }}</h1>
      <h4>{{ subHeader }}</h4>
      <ul class="list-inline">
        <li class="list-inline-item">payment@pulkam2019.com.my</li>
        <li class="list-inline-item">|</li>
        <li class="list-inline-item">Pulang Kampung 2019</li>
        <li class="list-inline-item">|</li>
        <li class="list-inline-item">03 3122 4241</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "appheader",
  props: {
      title: String,
      subHeader: String
  }
};
</script>
