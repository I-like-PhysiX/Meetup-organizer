<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-checkbox
                      v-model="agreement"
                      required>
                        <template slot="label">
                          I agree to the Terms of the&nbsp;
                          <a href="https://www.eugdpr.org/" target="_blank">GDPR</a>
                          &nbsp;and&nbsp;
                          <a href="https://legalict.com/factsheets/general-terms-conditions/" target="_blank">Conditions</a>*
                        </template>
                    </v-checkbox>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <div class="text-xs-center">
                      <v-btn round  type="submit" :disabled="loading" :loading="loading">
                        Sign up
                        <v-icon right>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                         </span>
                      </v-btn>
                    </div>
                    <br>
                    <p class="text-xs-center">You already have a Google account?</p>
                    <div class="text-xs-center">
                     <v-btn round color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">Sign up with Google&nbsp;
                       <i class="fab fa-google-plus-g"></i>
                       <span slot="loader" class="custom-loader">
                       <v-icon light>cached</v-icon>
                      </span>
                     </v-btn>
                   </div>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        agreement: false
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : true﻿
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onSigninGoogle () {
        this.$store.dispatch('signUserInGoogle')
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
