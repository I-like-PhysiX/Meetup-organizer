<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
          <v-layout row class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2 mb-3>
              <h1>My profile</h1>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
              <v-text-field
                name="name"
                label="Your name"
                id="name"
                v-model="displayName"
                readonly>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row row class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
              <v-text-field
                name="name"
                label="Your email"
                id="email"
                v-model="email"
                readonly>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row my-4>
            <v-flex xs12 sm6 offset-sm2>
              <h2>Registered meetups</h2>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-for="meetup in filteredMeetups" :key="meetup.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
              <v-card class="info">
                <v-container fluid>
                  <v-layout row>
                    <v-flex xs5 sm4 md3>
                      <v-card-media
                        :src="meetup.imageUrl"
                        height="130px">
                      </v-card-media>
                    </v-flex>
                    <v-flex xs7 sm8 md9>
                      <v-card-title primary-title>
                        <div>
                          <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                          <div>{{ meetup.date }}</div>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn flat :to="'/meetups/' + meetup.id">
                          <v-icon left light>arrow_forward</v-icon>
                          View Meetup
                        </v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
           </v-layout>
          <v-layout row mb-5>
         </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import * as firebase from 'firebase'

  export default {
    data () {
      return {
        displayName: '',
        email: '',
        filteredMeetups: []
      }
    },
    computed: {
      registeredMeetups(){
        return this.$store.state.user.registeredMeetups
      },
      loadedMeetups(){
        return this.$store.state.loadedMeetups
      }
    },
    created () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.displayName = user.displayName
          this.email = user.email
        }
      }),
      this.filter();
    },
    methods: {
      filter(){
        this.registeredMeetups.forEach((v, k) => {
          this.loadedMeetups.forEach((w, l) => {
            if(v.localeCompare(w.id)==0){
              this.filteredMeetups.push(w)
            }
          }
         )
         }
        )
      }
    }
  }
</script>
