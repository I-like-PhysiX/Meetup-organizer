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
		   <v-layout row wrap class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
               <v-expansion-panel style="padding">
                 <v-expansion-panel-content>
                   <div slot="header"><h2>Created meetups</h2></div>
                   <v-layout row wrap class="mb-2" v-for="meetup in created_meetups" :key="meetup.id">
                     <v-flex>
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
                 </v-expansion-panel-content>
               </v-expansion-panel>
             </v-flex>
           </v-layout>
		   <v-layout row wrap class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
               <v-expansion-panel style="padding">
                 <v-expansion-panel-content>
                   <div slot="header"><h2>Registered meetups</h2></div>
                   <v-layout row wrap class="mb-2" v-for="meetup in registered_meetups" :key="meetup.id">
                     <v-flex>
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
                 </v-expansion-panel-content>
               </v-expansion-panel>
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
		created_meetups: [],
		registered_meetups: []
      }
    },
    computed: {
	  user(){
		return this.$store.getters.user;
	  }
    },
    created () {
      this.AuthStateChanged();
	  this.created_meetups_method();
	  this.registered_meetups_method(this.user.id)
    },
    methods: {
			AuthStateChanged(){
				firebase.auth().onAuthStateChanged(user => {
					if (user) {
					  this.displayName = user.displayName
					  this.email = user.email
					}
				  })
			},
			created_meetups_method(){
				if(this.user){
					firebase.database().ref().child('meetups').orderByChild('creatorId').equalTo(this.user.id).once('value')
					.then((data) => {
						const meetups = []
						const obj = data.val()
						for (let key in obj) {
						  meetups.push({
							id: key,
							title: obj[key].title,
							description: obj[key].description,
							imageUrl: obj[key].imageUrl,
							date: obj[key].date,
							location: obj[key].location,
							creatorId: obj[key].creatorId
						  })
						}
						this.created_meetups=meetups
					  })
					  .catch(
						(error) => {
						  console.log(error)
						}
					  )
					}
			},
			registered_meetups_method(key){
				if(this.user){
					firebase.database().ref().child('users').child(key).child('registrations').on('child_added', snap => {
						firebase.database().ref().child('meetups').child(snap.val()).once('value')
							.then((data) => {
								this.registered_meetups.push({
                  id: data.key,
                  title: data.val().title,
                  description: data.val().description,
                  imageUrl: data.val().imageUrl,
                  date: data.val().date,
                  location: data.val().location,
                  creatorId: data.val().creatorId
							   })
							 })
							 .catch(
								(error) => {
								  console.log(error)
								}
							  )
					})
				}
			}
			}
		
		}
</script>
