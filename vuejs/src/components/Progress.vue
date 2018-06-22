<template>
  <div>
    <span>{{getPercentage + '%'}}</span> 
    <progress class="progress" v-bind:class="computedClass" v-bind:value="currentValue" v-bind:max="maxVal"></progress>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Progress',
  //Properties for data binding
  props: ['initialVal','maxVal'],
  data(){
    return { diff : 0}
  },
  computed: {
    //Returns a percentage value 
    getPercentage() {
      return Math.round((this.currentValue*100)/this.maxVal);
    },
    //Returns a computed cursor value
    currentValue() {
        return Math.max(0,this.initialVal+this.diff);
    },
    //Used to show different color when cursor overflows
    computedClass() {
       return (this.initialVal+this.diff) > this.maxVal ? 'is-danger':'is-info'
    },
  },
  methods:{
    //Accepts a new value and update the slider value 
    changeValue(val){
        this.diff = Math.max(-this.initialVal,this.diff+val); 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* smooth change */
  .progress::-webkit-progress-value{
    transition: width 0.5s ease-in-out;
  }
</style>
