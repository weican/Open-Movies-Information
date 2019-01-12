<template>
  <div id="app">
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">About</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

  <MoviesPage title="Rank of popular movies and the details"/>
    
        <section id="lab_social_icon_footer">
          <b-row>
            <b-col cols="auto" class="mr-auto p-5">
              <footer class="page-footer font-small blue">
              <div class="footer-copyright text-center py-2"><b>© 2019 Wales Chang</b>
              </div>
              </footer>
            </b-col>
            <b-col cols="auto"  class="p-5">
              <div class="text-center center-block">
              <a href="https://github.com/weican/open-movies-information"><i id="social-gb" class="fa fa-github-square fa-3x social"></i></a>
              <a href="https://www.linkedin.com/in/wales-chang-41250b63/p"><i id="social-li" class="fa fa-linkedin-square fa-3x social"></i></a>
            </div>
            </b-col>
          </b-row>
        </section>
  </div>

  
</template>

<script>
import MoviesPage from './components/MoviesPage.vue'

export default {
  name: 'app',
  components: {
    MoviesPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#lab_social_icon_footer {
  background-color: #dedede;
}

#lab_social_icon_footer a {
  color: #333;
}

#lab_social_icon_footer .social:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}

#lab_social_icon_footer .social {
  -webkit-transform: scale(0.8);
  /* Browser Variations: */
  
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
}
/*
    Multicoloured Hover Variations
*/

#lab_social_icon_footer #social-gb:hover {
  color: #3B5998;
}

#lab_social_icon_footer #social-li:hover {
  color: #4099FF;
}
</style>
