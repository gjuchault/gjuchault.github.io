<template>
  <footer>
    <a target="_blank" rel="noopener" href="https://github.com/gjuchault">
      <img src="../assets/github.png" height="16" alt="Github" />
      Github
    </a>
    <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/gjuchault/">
      <img src="../assets/linkedin.png" height="16" alt="LinkedIn" />
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
