<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h4>{{subtitle}}</h4>
    
         <b-container fluid class="p-4">
          <b-row>
            <b-col>
              <b-card v-bind:title= "selectedMovie.title"
                    tag="article"
                    style="max-width: 50rem;"
                    class="mb-2">
              <b-row>
                <b-col>
                  <b-img thumbnail fluid v-bind:src= "selectedMovie.poster_path" alt="Thumbnail" />
                </b-col>
                <b-col>
                  <figure>
                    <chart style="width:100%; height:100%" ref="gauge" :options="setVoteOption" />
                  </figure>
                  <p class="card-text">
                    {{selectedMovie.overview}}
                  </p>

                </b-col>
              </b-row>
              <div slot="footer">
                  <small class="text-muted">Release date: {{selectedMovie.releaseData}}</small>
              </div>
            </b-card>
            </b-col>
            <b-col>
              <figure>
              <chart :options="setMostPopOption" ref="bar" @mouseover="mouseOver" />
              </figure>
            </b-col>
            
          </b-row>
          <b-row>
            <b-col>
              <figure>
              <chart :options="setOption" ref="bar" theme="ovilia-green" auto-resize/>
              </figure>
            </b-col>
          </b-row>
        </b-container>
     
  </div>
</template>

<script>
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/gauge'
export default {
  name: 'LineChart',
  components: {
    'chart': ECharts
  },
  data() {
    return {
      subtitle: 'Providing movies information for you',
      movieData: [],
      baseImgUrl: "https://image.tmdb.org/t/p/w500/",
      selectedMovie: {
        title: "",
        overview: "",
        poster_path: "",
        releaseData:""
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
      },
      setVoteOption: {
        series: [
          {
            name: 'Vote avgerage',
            type: 'gauge',
            splitNumber: -1,
            radius: '90%',
            axisLine: {           
              lineStyle: {    
                 width: 10
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            lineStyle: {
              "color": [
                [0, "#1d60ac"],
                [1, "#f6f7fa"]
              ]
            },
            data: [{value: 0}]
          }
        ]
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
      this.updateMoiveCard(e.dataIndex);
    },
    updateMoiveCard(index) {
      this.selectedMovie.title = this.movieData[this.movieData.length - index - 1].title;
      this.selectedMovie.overview = this.movieData[this.movieData.length - index - 1].overview;
      this.selectedMovie.poster_path = this.baseImgUrl + this.movieData[this.movieData.length - index - 1].poster_path;
      this.selectedMovie.releaseData =  this.movieData[this.movieData.length - index - 1].release_date;
      this.setVoteOption.series[0].data = [{value: this.movieData[this.movieData.length - index - 1].vote_avg * 10}];
      this.setVoteOption.series[0].detail = {
        formatter: function (value) {
          return value + '%';
        },
        textStyle: {
          "fontSize": "20",
        }
      }
      this.setVoteOption.series[0].axisLine = {
        lineStyle: {
          "color": [
            [this.movieData[this.movieData.length - index - 1].vote_avg / 10, "#1d60ac"],
            [1, "#f6f7fa"]
          ]
        }
      };
    },
    getMoviesInfo: function() {
      axios
      .get('http://localhost:8080/getAll')
      .then(
        
        response => { 
          this.movieData = response.data;
          this.updateMoiveCard(this.movieData.length-1);
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
img {
  width: auto;
  border-radius: 2px;
  transition: width 1s;
}
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
