(function ($, chart){
	var __defaults = {
		chartID : '#main',
		chartEl : null,
		chartWidth : 960,
		chartHeight : 600,
		chartType : 'bar'
	};

	// chart option strategies
	var OptionGroup = {
		'bar' : function (data) {

			var xData = {};
			var legendData = ['male', 'female', 'male+female'];
			var seriesData = [];
			var mData = [];
			var fData = [];
			var mfData = [];

			var mMap = {};
			var fMap = {};
			var mfMap = {};

			for (var i = 0, l = data.length; i < l; i++) {
				var item = data[i];
				var salary = item['salary'];
				xData[item.age_group] = true;

				if (item.gender == 'male') {
					if (!mMap[item.age_group]) {
						mMap[item.age_group] = +salary;
					} else {
						mMap[item.age_group] += +salary;
					}
				} else if (item.gender == 'female') {
					if (!fMap[item.age_group]) {
						fMap[item.age_group] = +salary;
					} else {
						fMap[item.age_group] += +salary;
					}
				}

				if (!mfMap[item.age_group]) {
					mfMap[item.age_group] = +salary;
				} else {
					mfMap[item.age_group] += +salary;
				}
			}

			for (var ageGroup in mMap) {
				mData.push(mMap[ageGroup]);
				fData.push(fMap[ageGroup]);
				mfData.push(mfMap[ageGroup]);
			}

			seriesData.push({
	            name:'male',
	            type:'bar',
	            data:mData
	        });

	        seriesData.push({
	            name:'female',
	            type:'bar',
	            data:fData
	        });

	        seriesData.push({
	            name:'male+female',
	            type:'bar',
	            data:mfData
	        });

			var option = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    legend: {
			        data:legendData
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : Object.keys(xData)
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : seriesData
			};

			return option;
		},
		'line' : function (data) {
			var ageData = {};
			var map = {};
			var salaryData = [];
			var rewardData = [];

			for (var i = 0, l = data.length; i < l; i++) {
				var item = data[i];
				var salary = +item.salary;
				var reward = +item.reward;
				ageData[item.age] = true;

				if (!map[item.age]) {
					map[item.age] = {};
				}

				if (!map[item.age]['salary']) {
					map[item.age]['salary'] = +salary
				} else {
					map[item.age]['salary'] += +salary
				}

				if (!map[item.age]['reward']) {
					map[item.age]['reward'] = +reward
				} else {
					map[item.age]['reward'] += +reward
				}
			}

			for (var age in map) {
				var current = map[age];
				salaryData.push(current['salary']);
				rewardData.push(current['reward']);
			}

			var option = {
			    title: {
			        text: '折线图'
			    },
			    legend: {
			        data:['salary', 'reward']
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : 1,
			            data : Object.keys(ageData)
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'salary',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:salaryData
			        },
			        {
			            name:'reward',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:rewardData
			        }
			    ]
			};

			return option;
		},
		'scatter' : function (data) {

			var scatterData = [];
			for (var i = 0, l = data.length; i < l; i++) {
				var item = data[i];
				scatterData.push([
					+item['sign_in'],
					+item['task']
				]);
			}

			var option = {
			    title: {
			        text: '散点图'
			    },
			    tooltip : {
			        trigger: 'axis',
			        showDelay : 0,
			        axisPointer:{
			            show: true,
			            type : 'cross',
			            lineStyle: {
			                type : 'dashed',
			                width : 1
			            }
			        },
			        zlevel: 1
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    xAxis : [
			        {
			            type : 'value',
			            scale:true
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true
			        }
			    ],
			    series : [
			        {
			            name:'check_in : task',
			            type:'scatter',
			            large: true,
			            symbolSize: 10,
			            data: scatterData
			        }
			    ]
			};


			return option;
		}
	};

	var URLPrefix = 'http://localhost:8080';
	var APP = {
		el : null,
		chartEls : {
			'#chart-line' : null,
			'#chart-bar' : null,
			'#chart-scatter' : null
		},
		chartElsData : {
			'#chart-line' : null,
			'#chart-bar' : null,
			'#chart-scatter' : null
		},
		JSONFiles : {
			'#chart-line' : URLPrefix + '/data/chart-line.json',
			'#chart-bar' : URLPrefix + '/data/chart-bar.json',
			'#chart-scatter' : URLPrefix + '/data/chart-scatter.json'
		},
		chartOptions : {
			'#chart-line' : null,
			'#chart-bar' : null,
			'#chart-scatter' : null
		},
		init : function () {
			var config = $.extend(true, {}, __defaults);
			APP.bindEvents();
			APP.initChartEls();
			APP.initChartsData(function () {
				setTimeout(function () {
					APP.initChartOptions();
					APP.renderCharts();
					$('.nav li:first').trigger('click');
				}, 1000);
			});
		},
		initChartOptions : function () {
			var options = APP.chartOptions;
			for (var optId in options) {
				(function (options, optId){
					var optName = optId.split('-')[1];
					options[optId] = APP.getChartOption(optName, optId);
				})(options, optId);
			}
		},
		bindEvents : function () {
			var $aLi = $('.nav li');
			var $tabContent = $('#main .tab-content');
			$('.nav-tabs').on('click', 'li', function () {
				var $this = $(this);
				var index = $this.index();
				$aLi.removeClass('active');
				$this.addClass('active');
				$tabContent.hide().eq(index).show();
			});
		},
		initChartEls : function () {
			var els = APP.chartEls;
			for (var elId in els) {
				els[elId] = echarts.init($(elId)[0]);
			}
		},
		initChartsData : function (callback) {
			var files = APP.JSONFiles;
			var cnt = 0;
			for (var f in files) {
				var path = files[f];
				(function (f){
					APP.fetch(path, function (data) {
						APP.chartElsData[f] = JSON.parse(data);
						//console.log('APP.chartElsData['+f+']', APP.chartElsData[f]);
						cnt++;
					});
				})(f);
			}
			var fn = function () {
				if(cnt === Object.keys(files).length) {
					callback && callback();
				} else {
					setTimeout(fn, 200);
				}
			};
			fn();
		},
		fetch : function (path, callback) {
			$.ajax({
				url : path,
				type : "GET",
				cache : false,
				dataType : 'text',
				success : callback,
				error : function () {
					console.error(arguments);
				}
			});
		},
		getChartOption : function (type, dataId) {
			return OptionGroup[type](APP.chartElsData[dataId]);
		},
		renderCharts : function () {
			var chartOptions = APP.chartOptions;
			var chartEls = APP.chartEls;
			for (var optName in chartOptions) {
				APP.renderChart(chartEls[optName], chartOptions[optName]);
			}

		},
		renderChart : function (chartEl, option) {
			chartEl.setOption(option);
		}
	};


	return APP.init();
})(jQuery, echarts);