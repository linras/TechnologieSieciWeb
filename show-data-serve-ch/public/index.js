
new Vue({
  el: '#app',
  data () {
    return {
      konie: {cos: 'cos'},
      message: 'Vue is working',
      seen : true
    }
  },
  mounted () {
    axios
    .get('http://localhost:3000/konie')
    .then(response => (this.konie = response.data))
    .catch(error => console.log(error))
  }
})
