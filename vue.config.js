

module.exports = {
    outputDir: 'docs',
    baseUrl: process.env.NODE_ENV === 'production'
    ? '/open-movies-information/'
    : '/',
    productionSourceMap: false,
    transpileDependencies: [
        /\bvue-echarts\b/,
        /\bresize-detector\b/
      ]
   
}