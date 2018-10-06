import * as firebase from 'firebase'
import router from '../router'

export default {
  registerUserForMeetup ({commit, getters}, payload) {
    commit('setLoading', true)
    const user = getters.user
    firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('registerUserForMeetup', {id: payload, fbKey: data.key})
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  unregisterUserFromMeetup ({commit, getters}, payload) {
    commit('setLoading', true)
    const user = getters.user
    if (!user.fbKeys) {
      return
    }
    const fbKey = user.fbKeys[payload]
    firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterUserFromMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  loadMeetups ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('meetups').once('value')
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
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
  },
  createMeetup ({commit, getters}, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      imageUrl: payload.imageUrl,
      date: payload.date,
      creatorId: getters.user.id
    }
    let key
    firebase.database().ref('meetups').push(meetup)
      .then((data) => {
        key = data.key
        return key
      })
      .then(() => {
        commit('createMeetup', {
          ...meetup,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    // Reach out to firebase and store it
  },
  updateMeetupData ({commit}, payload) {
    commit('setLoading', true)
    const updateObj = {}
    if (payload.title) {
      updateObj.title = payload.title
    }
    if (payload.location) {
      updateObj.location = payload.location
    }
    if (payload.imageUrl) {
      updateObj.imageUrl = payload.imageUrl
    }
    if (payload.description) {
      updateObj.description = payload.description
    }
    if (payload.date) {
      updateObj.date = payload.date
    }
    firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  signUserInGoogle ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
  autoSignIn ({commit}, payload) {
    commit('setUser', {
      id: payload.uid,
      registeredMeetups: [],
      fbKeys: {}
    })
  },
  resetPasswordWithEmail ({ commit }, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.auth().sendPasswordResetEmail(email)
      .then(
        () => {
          commit('setLoading', false)
          console.log('Email Sent')
          commit('setError', {message: 'Email Sent!'})
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
  fetchUserData ({commit, getters}) {
    commit('setLoading', true)
    firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMeetups = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  logout ({commit}) {
    router.push(`/`);
    firebase.auth().signOut()
    commit('setUser', null)
  },
  clearError ({commit}) {
    commit('clearError')
  }
}
