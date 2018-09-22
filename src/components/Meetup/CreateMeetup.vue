
<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row my-5>
            <v-flex xs12 sm6 offset-sm3>
              <h2>Create new meetup</h2>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="Leírás"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" mb-3>
              <h3>Date & time pickers</h3>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center">
              <v-date-picker v-model="date" :min="new Date().toISOString().slice(0,10)"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center">
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row my-5>
            <v-flex class="text-xs-center">
              <v-btn
                color="error"
                :disabled="!formIsValid"
                type="submit">Create new meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date().toISOString().slice(0,10),
        time: new Date().toTimeString().split(" ")[0].slice(0,5)
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      submittableDateTime(){
        let currentdate=new Date(this.date)
        currentdate.setHours(Number(this.time.split(":")[0]))
        currentdate.setMinutes(Number(this.time.split(":")[1]))
        currentdate.setSeconds(new Date().getSeconds())
        return currentdate.toString()
      },
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      }
    }
  }
</script>
