Vue.component('doing-cp',{
  data: function () {
    return {
      doing: ''
    }
  },
  template: `
  <div class="col-md-4">
    <v-flex xs12>
      <v-card color="#007BFF" class="white--text">
        <v-card-title primary-title>
          <div class="headline">ON PROGRESS</div>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <loading-cp v-if="!doing"></loading-cp>
      <v-card color="#01008C" class="white--text" v-for="todo in doing">
        <v-card-title primary-title>
          <div class="headline">{{ todo.title }}</div>
        </v-card-title>
        <div style="text-align:justify; margin-left:20px;">{{ todo.description }}</div>
        <v-btn flat dark v-on:click="moveLeft(todo)">Move left</v-btn>
        <v-btn flat dark v-on:click="moveRight(todo)">Move right</v-btn>
      </v-card>
    </v-flex>
  </div>`,
  methods: {
    getDoing: function () {
      let self = this
      var database = firebase.database();
      var starCountRef = database.ref('/doing');
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
        self.doing = arr
      });
    },
    moveLeft: function (param) {
      firebase.database().ref(`/doing/${param.id}`).set({});
      firebase.database().ref('/todo').push({
        title: param.title,
        description : param.description
      });
    },
    moveRight: function (param) {
      firebase.database().ref(`/doing/${param.id}`).set({});
      firebase.database().ref('/done').push({
        title: param.title,
        description : param.description
      })
    }
  },
  created () {
    this.getDoing()
  }
})