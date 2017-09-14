<template>
  <header>
    <h1>Gabriel Juchault</h1>
    <div class="line"></div>
    <h2>Web developer</h2>
  </header>
</template>

<style scoped>
header {
  height: 25vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 2rem;

  background-color: #0d3745;
  color: #fff;
  text-align: center;
}

header > h1 {
  margin: 0;

  font-size: 2rem;

  font-weight: 200;
}

header > .line {
  height: 1px;
  width: 250px;
  margin: 10px auto;

  background-color: rgba(255, 255, 255, 0.6);
}

header > h2 {
  margin: 0;

  font-weight: 200;
}

@media (min-width: 400px) {
  header > h1 {
    font-size: 3rem;
  }
}
</style>
