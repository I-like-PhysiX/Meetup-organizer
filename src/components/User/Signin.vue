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
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
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
                    <div class="text-xs-center">
                    <v-btn round  type="submit" :disabled="loading" :loading="loading">
                      Sign in
                      <v-icon right>lock_open</v-icon>
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                    <br>
                    <br>
                    <p class="text-xs-center">You already have a Google account?</p>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">Sign in with Google&nbsp;
                        <i class="fab fa-google-plus-g"></i>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>
                    <br>
                    <div class="text-xs-center">
                      <p>Forgot your password?</p>
                      <v-btn round color="primary" dark :disabled="loading" :loading="loading" @click.prevent="onResetPassword">Reset password By Email
                        <v-icon right dark>email</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                      <br>
                      <br>
                      <p>Please check your emails and follow the instructions!</p>
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
        password: ''
      }
    },
    computed: {
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
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onSigninGoogle () {
        this.$store.dispatch('signUserInGoogle')
      },
      onResetPassword () {
        if (this.email === '') {
          return this.$store.dispatch('setError', {message: 'Email can not be blank'})
        }
        this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
