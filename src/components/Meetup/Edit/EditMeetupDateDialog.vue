<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <i class="fas fa-calendar-alt"></i>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h2><strong>Edit meetup date</strong></h2></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" :min="new Date().toISOString().slice(0,10)" style="width: 100%;" actions>
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
            </v-date-picker>
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
        editableDate: null,
        time: null
      }
    },
    methods: {
      onSaveChanges () {
        let newDate=new Date(this.editableDate)
        newDate.setHours(Number(this.time.split(":")[0]))
        newDate.setMinutes(Number(this.time.split(":")[1]))
        newDate.setSeconds(new Date().getSeconds())
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate.toString()
        })
      }
    },
    created () {
      this.editableDate = new Date(this.meetup.date).toISOString().slice(0,10);
      this.time = new Date(this.meetup.date).toTimeString().split(" ")[0].slice(0,5);
    }
  }
</script>
