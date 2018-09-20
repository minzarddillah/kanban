Vue.component('done-cp', {
  data: function () {
    return {
      done: ''
    }
  },
  template: `
  <div class="col-md-4">
    <v-flex xs12>
      <v-card color="green" class="white--text">
        <v-card-title primary-title>
          <div class="headline">DONE</div>
          <div style="margin-left:1000px;"></div>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <loading-cp v-if="!done"></loading-cp>
      <v-card color="#004F00" class="white--text" v-for="todo in done">
        <v-card-title primary-title>
          <div class="headline">{{ todo.title }}</div>
        </v-card-title>
        <div style="text-align:justify; margin-left:20px;">{{ todo.description }}</div>
        <v-btn flat dark v-on:click="moveLeft(todo)">Move left</v-btn>
        <v-btn flat dark v-on:click="remove(todo)">Remove</v-btn>
      </v-card>
    </v-flex>
  </div>`,
  methods: {
    getDone () {
      let self = this
      var database = firebase.database();
      var starCountRef = database.ref('/done');
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
        self.done = arr
      });
    },
    moveLeft (param) {
      firebase.database().ref(`/done/${param.id}`).set({});
      firebase.database().ref('/doing').push({
        title: param.title,
        description : param.description
      });
    },
    remove (param) {
      firebase.database().ref(`/done/${param.id}`).set({});
    }
  },
  created() {
    this.getDone()
  },
})