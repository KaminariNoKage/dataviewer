<template lang="pug">
div#app
  div.controlbar
    chart-select(@update="updateChart" :default-chart="defaults.chartType" :default-cohort="defaults.cohort" :default-stats="defaults.stats" :default-order="defaults.orderBy")
  div.chart
    div.title {{ title }}
    pie-chart(v-if="chartType === 'pie'" :labels="labels" :data="data")
    line-chart(v-if="chartType === 'line'" :labels="labels" :data="data" :ylabel="ylabel")
    bar-chart(v-if="chartType === 'bar'" :labels="labels" :data="data" :ylabel="ylabel")
</template>

<script>
  import ChartSelect from './components/ChartSelect'
  import BarChart from './components/BarChart'
  import PieChart from './components/PieChart'
  import LineChart from './components/LineChart'

  import DataCalcService from './dataCalcService'

const DEFAULT = {
  chartType: 'pie',
  cohort: 'product',
  stats: 'count',
  orderBy: 'A to Z'
}

export default {
  name: 'app',
  components: {
    ChartSelect,
    BarChart,
    PieChart,
    LineChart
  },
  data () {
    return {
      defaults: DEFAULT,
      chartType: DEFAULT.chartType,
      title: '',
      ylabel: '',
      labels: [],
      data: []
    }
  },
  methods: {
    updateChart(newData){
      DataCalcService.getUpdatedCalculations(newData)
      .then(res => {
        this.chartType = newData.chartType || this.chartType;
        this.title = `${newData.cohort} ${newData.stats}`;
        this.ylabel = newData.stats;

        this.labels = res? res.labels : [];
        this.data = res? res.datasets : [{ data: [] }];
      })
      .catch(err => alert(err));

    }
  },
  created(){
    this.updateChart(this.defaults);
  }
}
</script>

<style lang="scss">
/* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
  */
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline; }

  html, body {
    height: 100%; }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block; }

  body {
    line-height: 1; }

  ol, ul {
    list-style: none; }

  body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif; }

  * {
    font-family: Arial;
  }

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.controlbar {
  background: ghostwhite;
  padding: 1em;
  height: 100%;
  width: 250px;
  box-shadow: 0px 0px 10px -2px;
}

.chart {
  flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-variant: small-caps;
    padding-bottom: 1em;
    }
}
</style>
