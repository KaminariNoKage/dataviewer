<template lang="pug">
div#controls
	div
		div.button-wrapper
			button(@click="selectChartType('pie')" :class="{ active: chartOption === 'pie' }")
				chart-pie-icon
			button(@click="selectChartType('line')" :class="{ active: chartOption === 'line' }")
				chart-line-icon
			button(@click="selectChartType('bar')" :class="{ active: chartOption === 'bar' }")
				chart-bar-icon
	div.col
		label cohort
		select(v-model="cohortSelect" @change="update")
			option(v-for="co in cohort" :value="co") {{ capFirst(co) }}
	div.col
		label statistics
		select(v-model="statSelect" @change="update")
			option(v-for="stats in statistic" :value="stats") {{ capFirst(stats) }}
	div.col
		label order by
		select(v-model="orderBySelect" @change="update")
			option(v-for="order in orderBy" :value="order") {{ order }}
</template>

<script>

import ChartPieIcon from "vue-material-design-icons/chart-pie.vue"
import ChartLineIcon from "vue-material-design-icons/chart-line.vue"
import ChartBarIcon from "vue-material-design-icons/chart-bar.vue"


const COHORT = ['product', 'category', 'channel'];
const STATS = ['count', 'sum'];
const ORDER = ['A to Z', 'Z to A', 'min to max', 'max to min'];

export default {
  name: 'chartSelect',
  props: ['defaultChart', 'defaultCohort', 'defaultStats', 'defaultOrder'],
  components: {
  	ChartPieIcon,
  	ChartLineIcon,
  	ChartBarIcon
  },
  data () {
    return {
      cohort: COHORT,
      statistic: STATS,
      orderBy: ORDER,

      chartOption: this.defaultChart,
      cohortSelect: this.defaultCohort,
      statSelect: this.defaultStats,
      orderBySelect: this.defaultOrder
    }
  },
  methods: {
  	capFirst(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	},
  	selectChartType(type){
  		this.chartOption = type;
  		this.update();
  	},
  	update(){
  		this.$emit('update', {
  			chartType: this.chartOption,
  			cohort: this.cohortSelect,
  			stats: this.statSelect,
  			orderBy: this.orderBySelect
  		});
  	}
  }
}
</script>

<style lang="scss">
$radius: 20%;

#controls > div {
	margin-bottom: 1em;
}

.col {
	display: flex;
	flex-direction: column;

	label {
		text-align: left;
		font-variant: small-caps;
	}

	> select {
		flex-grow: 1;
		margin: .5em 0;
    	font-size: 16px;
	}
}

.button-wrapper {
	> button {
		font-size: 20px;
		border: none;
		outline: none;
		border-top: 1px darkgray solid;
		border-bottom: 1px darkgray solid;
		background: rgb(221, 221, 221);

    	&:first-child {
	    	border-radius: $radius 0 0 $radius;
    	}
    	&:last-child {
    		border-radius: 0 $radius $radius 0;
    	}

		&.active {
		    box-shadow: inset 1px 1px 10px -4px;
			pointer-events: none;
			background: rgb(201, 201, 201);
		}
	}
}
</style>
