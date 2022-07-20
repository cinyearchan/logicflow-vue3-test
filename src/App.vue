<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div class="App">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
@import "@logicflow/core/dist/style/index.css";

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
* {
  box-sizing: border-box;
}

.App {
  display: flex;
  width: 100%;
}

.container {
  border: 1px rgb(230, 230, 230) solid;
  border-radius: 6px;
  padding: 0 10px 10px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.viewport {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.import_icon {
  color: red;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
