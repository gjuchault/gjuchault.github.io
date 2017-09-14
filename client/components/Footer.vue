<template>
  <footer>
    <a target="_blank" href="https://github.com/gjuchault">
      <img src="../assets/github.png" height="16" />
      Github
    </a>
    <a target="_blank" href="https://www.linkedin.com/in/gjuchault/">
      <img src="../assets/linkedin.png" height="16">
      LinkedIn
    </a>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;

  background-color: #0d3745;
  padding: 1rem;
}

footer a {
  &:first-child {
    margin-right: 1rem;
  }

  display: inline-flex;
  justify-content: center;

  color: #fff;
  text-decoration: none;
}

footer a img {
  margin-right: 3px;
}
</style>
