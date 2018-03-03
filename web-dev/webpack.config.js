const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器
const extractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，
const extractCSS = new extractTextPlugin('css/[name]-[chunkhash].bundle.css');
const extractLESS = new extractTextPlugin('css/[name]-[chunkhash].bundle.css');
const cleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
const del = require('del');
const copyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝

console.log(process.env.project,'============')

const getEntry = {
	// 获取需要打包生成的模板数量
	entry: function(dirPath,option){
        const fileArr = fs.readdirSync(dirPath);
        const files = fileArr.filter(function(file){
            return option.test(file);
        });
		const entries = {};
		let dirname;
		let basename;
		let extname;
		for (var i = 0; i < files.length; i++) {
			dirname = path.dirname(files[i]);
			extname = path.extname(files[i]);
			basename = path.basename(files[i], extname);
			entries[basename] = dirPath + basename + extname;
        }
		return entries;
    }
};

const config = {
    entry: getEntry.entry('./src/one/js/',/\^*.js$/),
	output: { // 出口文件路径，__dirname 指向当前项目根路径。
		path: __dirname + '/dist/one',
		filename: 'js/[name]-[chunkhash].bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({ //全局配置加载
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		// 未解决
		// new cleanPlugin(['/dist/one/js/signin-e87fe59c5ee952716023.bundle'], {// 清空dist文件夹
		// 	'root':  __dirname,
		// 	'verbose': true, 
		// 	'dry': false, 
		// }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 将公共模块提取，生成名为`common`的chunk
			minChunks: 3 // 提取至少3个模块共有的部分
		}),
		new copyWebpackPlugin([
            {from: './src/one/img', to: './img'} //拷贝图片
		]),
		extractCSS,
		extractLESS, 
	],
	module: {
		rules: [ 
            {
				test: /\.css$/,
				use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
			},
			{
				test: /\.less$/i,
				use: extractLESS.extract([ 'css-loader', 'less-loader' ])
			},
			{
				test: /\.html$/,
				use: 'raw-loader'
			},
			{
				test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/,
		        query:{
		        	presets: ['es2015']
		        }
		    },
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			},
			{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 30720, //30kb 图片转base64。设置图片大小，小于此数则转换。
                    name: '../img/[name].[ext]?' //输出目录以及名称
                }
            }
		]
	},
	devtool: 'eval-source-map',
	devServer: {
        contentBase: './src',  //以src为根目录提供文件
        historyApiFallback: true,
		inline: true,
		
	},
}

// 获取需要生成的 html 模板
const htmlPage = function(){
	const pages = getEntry.entry('./src/one/html/',/\^*.html$/);
	for(page in pages){
		const pluginOption = {
			filename: page + '.html', //生成的 html名字
			template: './src/one/html/' + page + '.html', // 引用的 html模板路径
			inject: true, //允许插件修改哪些内容，包括head与body
			hash: false, //是否添加hash值
			minify: { //压缩HTML文件
				removeComments: true,//移除HTML中的注释
				collapseWhitespace: false //删除空白符与换行符
			},
			chunks: ['common', page] // 引用的 外链文件
		}
		config.plugins.push(new htmlWebpackPlugin(pluginOption));
	}
}

// 创建、添加 html 模板
htmlPage();
module.exports = config;