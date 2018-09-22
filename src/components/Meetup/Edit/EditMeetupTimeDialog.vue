<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <i class="far fa-clock"></i>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h2><strong>Edit meetup time</strong></h2></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%;" actions format="24hr">
              <template>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="editDialog = false">Close</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        let newDate=new Date(this.meetup.date)
        newDate.setHours(Number(this.editableTime.split(":")[0]))
        newDate.setMinutes(Number(this.editableTime.split(":")[1]))
        newDate.setSeconds(new Date().getSeconds())
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate.toString()
        })
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString().split(" ")[0].slice(0,5);
    }
  }
</script>
