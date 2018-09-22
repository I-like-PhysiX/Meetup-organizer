
<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
            <template v-if="userIsRegistered">
              <v-spacer></v-spacer>
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">Date & place</div>
            <div>{{ meetup.date }} - {{ meetup.location }}</div>
          </v-card-text>
          <v-card-text>
            <div class="info--text">Description</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" accent v-if="!userIsAuthenticated" to="/signin">Register</v-btn>
            <app-meetup-register-dialog :meetupId="meetup.id" @clicked="setuserIsRegistered" v-if="userIsAuthenticated"></app-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        userIsRegistered: false
      }
    },
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      setuserIsRegistered (value) {
        this.userIsRegistered=value;
      }
    }
  }
</script>
