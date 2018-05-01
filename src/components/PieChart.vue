<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['labels', 'data'],
  watch: {
  	labels(value){
  		this.update();
  	},
  	data(value){
  		this.update();
  	}
  },
  methods: {
  	update(){

      if(this.$data._chart){
        this.$data._chart.destroy();
      }
      
  		this.renderChart({
  			labels: this.labels,
  			datasets: this.data
  		}, {
        responsive: true, 
        maintainAspectRatio: false,
      });
  	}
  },
  mounted () {
  	this.update();
  }
}
</script>