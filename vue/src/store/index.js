import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    searchResults: [],
    currentMeal: 0,
    favoritedRecipes: []
  },
  getters: {
    favorite_recipes(state) {
      return state.favoritedRecipes
    }
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    },
    SET_SEARCH_RESULTS(state, searchResults){
      state.searchResults = searchResults;
    },
    SET_FAVORITED_RECIPES(state, recipes) {
      console.log("entering the store");
      state.favoritedRecipes = recipes;
    },
    ADD_RECIPE (state, recipe) {
      state.favoritedRecipes.push(recipe);
    },
    REMOVE_RECIPE(state, recipe) {
      console.log("leaving the store");
      const index = state.favoritedRecipes.indexOf(recipe);
      state.favoritedRecipes.splice(index, 1);
    },
    SET_CURRENT_MEAL(state, mealId) {
      state.currentMeal = mealId;
    },
  }
})
