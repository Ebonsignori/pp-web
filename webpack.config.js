require('dotenv').config() // Load private env from .env

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

async function webpackConfig () {
  return {
    // devtool alternative : "cheap-module-eval-source-map" inline-sourcemap,
    devtool: 'source-map',

    entry: [
      'babel-polyfill',
      './src/js/app.js'
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'index.min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader']
            })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'style.css' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.API_URL': process.env.NODE_ENV === 'production'
          ? JSON.stringify('https://13944377.ngrok.io')
          : JSON.stringify(await getDevUrl()),
        'process.env.WEB_URL': process.env.NODE_ENV === 'production'
          ? JSON.stringify('https://ebonsignori.github.io/planning-poker')
          : JSON.stringify('http://localhost:8086')
      })
    ],
    devServer: {
      historyApiFallback: true,
      stats: 'minimal',
      compress: true,
      // inline: true,
      contentBase: './dist',
      port: 8086,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      hot: false,
      inline: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    }
  }
}

async function getDevUrl () {
  const axios = require('axios')
  let ngrokUp = false
  let firstError = true
  let devUrl
  while (!ngrokUp) {
    let resp
    try {
      resp = await axios.get(`http://localhost:${process.env.NGROK_HELPER_PORT}/api/tunnels`)
      const tunnels = resp.data && resp.data.tunnels
      // const httpTunnel = tunnels[0].public_url
      const httpsTunnel = tunnels[1].public_url
      devUrl = httpsTunnel
      if (!firstError) {
        console.log('Ngrok connection found!')
      }
      console.log(`Ngrok Url: ${devUrl}`)
      ngrokUp = true
    } catch (err) {
      if (firstError) {
        console.log('Ngrok is not running. Please start it listening on the api port.')
        firstError = false
        console.log('Waiting for ngrok connection...')
      }
      await sleep(1000) // Check every 1 seconds for ngrok connection
    }
  }

  return devUrl
}

async function sleep (ms) {
  return new Promise(resolve => setTimeout(() => { resolve() }, ms))
}

module.exports = webpackConfig()
