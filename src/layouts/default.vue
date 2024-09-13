<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-responsive
          class="align-center fill-height mx-auto beach"
          max-width="450"
        >
          <router-view />
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style scoped lang="css">
.beach {
  background-image: linear-gradient(0deg, cyan 0%, rgba(216, 200, 123, 0.5) 40%);
}
</style>
