<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['labels', 'data', 'ylabel'],
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
        scales: {
          yAxes: [{
            ticks: {
            beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: this.ylabel
            }
            }],
            xAxes: [{
                ticks: {
                  autoSkip: false
                }

            }]
          }
      });
  	}
  },
  mounted () {
  	this.update();
  }
}
</script>