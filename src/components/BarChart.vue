<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
        legend: {
            display: false
        },
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
                gridLines: {
                    offsetGridLines: true
                },
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