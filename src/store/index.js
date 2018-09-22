import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      /*
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date().toLocaleString(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date().toLocaleString(),
        location: 'Paris',
        description: 'It's Paris!'
      }
      */
    ],
    user: null,
    loading: false,
    error: null
  },
  getters: getters,
  mutations: mutations,
  actions: actions
})
