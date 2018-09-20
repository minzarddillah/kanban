Vue.component('to-do', {
  template: `
  <div class="col-md-4">
    <v-flex xs12>
      <v-card color="#6C757D" class="white--text">
        <v-card-title primary-title>
          <div class="headline">TODO</div>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <loading-cp v-if="!todos"></loading-cp>
      <v-card color="#343A40" class="white--text" v-for="todo in todos">
        <v-card-title primary-title>
          <div class="headline">{{ todo.title }}</div>
        </v-card-title>
        <div style="text-align:justify; margin-left:20px;">{{ todo.description }}</div>
        <v-btn flat dark v-on:click="moveRight(todo)">Move right</v-btn>
      </v-card>

    </v-flex>

  </div>`,
  data: function () {
    // #343A40
    return {
      todos: ''
    }
  },
  methods: {
    getTodo () {
      let self = this
      var database = firebase.database();
      var starCountRef = database.ref('/todo');
      console.log(`masuk`)
      starCountRef.on('value', function(snapshot) {
        let arr = []
        let keys
        let values
        if(snapshot.val()){
          keys = Object.keys(snapshot.val())
          values = Object.values(snapshot.val())
        }else{
          keys = []
          values = []
        }

        for(let i = 0 ; i < keys.length ; i++) {
          arr.push({
            id: keys[i],
            title: values[i].title,
            description: values[i].description
          })
        }
        self.todos = arr
      });
    },
    moveRight (param) {
      firebase.database().ref(`/todo/${param.id}`).set({});
      firebase.database().ref('/doing').push({
        title: param.title,
        description : param.description
      });
    }
  },
  created () {
    this.getTodo()
  }
})