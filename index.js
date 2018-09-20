new Vue ({
  el: '#app',
  data: {
    title: '',
    description: ''
  },
  methods: {
    addTask () {
      if (!this.title || !this.description) {
        alert('Task Atau Description tidak boleh kosong')
      }else{
        firebase.database().ref('/todo').push({
          title: this.title,
          description : this.description
        });
        this.title = ''
        this.description = ''
      }
    }
  }
})