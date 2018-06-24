<template>
  <div id="app">
    <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="./assets/logo.png"  width="28" height="28">
          <img src="./assets/bulma.png"  width="20" height="28">
        </a>
        <a class="navbar-item title is-5">
          Progress Bar Vue.js+Bulma
        </a>
      </div>
    </nav>
    <div class="container">
      <div class="has-padding-y">
        <div class="buttons is-centered">
          <span class="button is-warning is-rounded" :class="{'is-loading':loading }" @click="loadRemoteData">Load Remote Data</span>
        </div>
      </div>
      <div class="columns is-multiline" v-if="data.bars">
        <div class="column is-6-tablet is-4-desktop is-3-widescreen" v-for="(item, index) in data.bars">
            <Progress :initialVal="item" :maxVal="data.limit" :ref="'bar-'+index"></Progress>
        </div>
      </div>
      <div class="columns is-multiline has-padding-x" v-if="data.bars">
        <div class="column is-6-tablet">
            <div class="field">
              <label class="label">Active Bar</label>
              <div class="control">
                  <div class="select">
                    <select name="bar" v-model="selectedBar">
                      <option :value="'bar-'+index" v-for="(item, index) in data.bars">Progress Bar {{index+1}}</option>
                    </select>
                  </div>
              </div>
            </div>
        </div>
        <div class="column is-6-tablet">
          <label class="label">Progress</label>
          <div class="field is-grouped">
            <div class="control" v-for="item in data.buttons">
              <button :value="item" type="button" class="button is-primary" @click="changeProgressValue(selectedBar,item)">{{item}}</button>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from './components/Progress';
//Equalent of JQuery Ajax . Used to make ajax calls.
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Progress,
  },
  //App initial state
  data(){
    return { data: {},selectedBar:'bar-0',loading:false }
  },
  created() {
    //hit the api on component creation
    this.loadRemoteData()
  },
  methods: {
    //Event method used by the value control buttons 
    //Accepts target Progress Bar ref as name, and the value to be incremented / deceremented
    changeProgressValue(target,val){
      let pb = this.$refs[target][0];
      pb.changeValue(val);
    },
    //Hits the api server and populates bars data
    loadRemoteData(){
      this.loading = true;
      axios.get(`//pb-api.herokuapp.com/bars`)
      .then(response => {
        //Mimic the network delay - to show the loding animation.
        setTimeout(()=>{
          this.data = response.data;
          //reset the select box to point out the first slider when data changes
          selectedBar:'bar-0';
          this.loading = false;
        },500)
        

      })
      .catch(e => {
        this.loading = false;
        console.log(e);
      })
    },
  }
};
</script>

<style>
  /* Extending bulma by adding these spacer utility classes */
  .has-padding{
    padding: 20px;
  }
  .has-padding-x{
    padding-left: 20px;
    padding-right: 20px;
  }
  .has-padding-y{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .has-margin{
    margin: 20px;
  }
  .has-margin-x{
    margin-left: 20px;
    margin-right: 20px;
  }
  .has-margin-y{
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
