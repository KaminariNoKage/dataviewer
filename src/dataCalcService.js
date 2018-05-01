import Api from './api'

// Could also make a random color generator to accomodate larger datasets
// But didn't want to go overboard with this
const COLOR = ['rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(0, 128, 128)',
                'rgb(0, 255, 0)',
                'rgb(255, 0, 0)',
                'rgb(255, 0, 255)'];

export default {
	getUpdatedCalculations(newData){
		return new Promise((resolve, reject) => {
			Api.getData(newData.cohort, newData.stats)
			.then(res => {
				let data = res.data;
				// Need to sort the data before splitting it into ChartJS view
				sortDataView(data, newData.orderBy);
				resolve(splitLabelsAndPoints(data, newData.chartType));
			})
			.catch(reject);
		});
	}
}

function splitLabelsAndPoints(foundData, chartType){
	var labels = [];
	var data = [];
	var backgroundColor = [];

	if(chartType === 'pie' || chartType === 'bar'){
		foundData.forEach((item, index) => {
			labels.push(item.label);
			data.push(item.value);
			backgroundColor.push(COLOR[index]);

		})

		return {
			labels: labels,
			datasets: [{
				backgroundColor: backgroundColor,
				data: data
			}]
		}
	} else if(chartType === 'line'){
		// Not quite sure what to do with line data
		// Give the api doesn't have anything in sequence
		// But will do individual points/lines here
		foundData.forEach((item, index) => {
			data.push({
				label: item.label,
				borderColor: COLOR[index],
				data: [item.value, item.value]
			})
		});

		return {
			labels: labels,
			datasets: data
		}
	}
	
}

function sortDataView(data, sort){
	// Reorders the data to be either alphabetical or value ascending/descending
	data.sort((a, b) => {
		if(sort === 'A to Z'){
			return a.label.toUpperCase() > b.label.toUpperCase()? 1 : -1;
		}
		if(sort === 'Z to A'){
			return a.label.toUpperCase() < b.label.toUpperCase()? 1 : -1;
		}
		if(sort === 'min to max'){
			return a.value > b.value;
		}
		if(sort === 'max to min'){
			return a.value < b.value;
		}
	})
	
}