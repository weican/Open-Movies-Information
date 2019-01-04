<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h4>{{subtitle}}</h4>
     <ul>
       <li>
         <div>
           {{selectedMovie.title}}
         </div>
       </li>
       <li>
        <figure>
        <chart :options="setMostPopOption" ref="bar" @mouseover="mouseOver" />
        </figure>
       </li>
       <li>
        <figure>
        <chart :options="setOption" ref="bar" theme="ovilia-green" auto-resize/>
        </figure>
       </li>
     </ul>
  </div>
</template>

<script>
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/chart/gauge'
export default {
  name: 'LineChart',
  components: {
    'chart': ECharts
  },
  data() {
    return {
      subtitle: 'Providing movies information for you',
      movieData: [],
      selectedMovie: {
        title: ""
      },
      setMostPopOption: {
        title: {
          text: "Most pop"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
        },
        yAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            formatter:  function(value) {
              return value.length > 10? value.substring(0,10) + "...": value;
            }
          }
        }
      },
      setOption : {
        title: {
          text: "Budget/Rev chart"
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
           type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1300],
          type: 'bar'
        }]
      }

    }
  },
  props: {
    msg: String
  },
  mounted() {
    this.getMoviesInfo();
  },
  methods: {
   
    mouseOver: function(e) {
      console.log(e)
    },
    getMoviesInfo: function() {
      axios
      .get('http://localhost:8080/getAll')
      .then(
        
        response => { 
          this.movieData = response.data;
          let movieName =  response.data.map(element => {
              return element.title;
          })
          let moviePop = response.data.map(element => {
            return element.pop;
          })

          this.setMostPopOption.title.text = "Most popurlity movies in 2018"
          this.setMostPopOption.series = {
            data: moviePop.reverse(),
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new ECharts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    ),
                },
                emphasis: {
                    color: new ECharts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            }
          },
          movieName = movieName.reverse().map(res => {
              return {
                // value: res.substring(0,10) + "...",
                value: res,
                textStyle: {
                  align: 'right'
                }
              }
              
          })

          this.setMostPopOption.yAxis = {
            type: 'category',
            data: movieName
          }
          
        }
      )
    }
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts {
  width: 500px;
  height: 500px;
}
h3 {
  margin: 40px 0 0;
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
</style>
