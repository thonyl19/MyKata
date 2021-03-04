const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')();
const cors =require('@koa/cors');
//const parameter = require('koa-parameter');
const morgan =require('morgan'); 
 

//有空再試
const {KoaRouterApp} = require('../QuokkaApp/KoaApp');
const Koa_api = require('./Koa_api');

const app = new koa();

var page = {
	async ''(ctx,next){
		ctx.response.body = 'hello world';
	}
	,async 'id/:id'(ctx,next){
		let {id} = ctx.params;
		ctx.response.body = `[id]${id}`;
	}
}
 
var _router = {
	//'/tpl/':{employe,user,view,opction,log,joblist},
	'/api/':Koa_api,
	'/page':page
};
KoaRouterApp.Mode_C(_router,Router);

Router.get('/favicon.ico',async(ctx, next)=>{
	ctx.res.end();
})
  

// enable CORS - Cross Origin Resource Sharing
// 解決 CORS 調用的問題
app.use(cors()); 
//app.use(index);
app.use(bodyParser());
app.use(Router.routes());
app.use(morgan('dev'));

app.on('error', (err, ctx) => {
	console.log({koa_err:err});	
});  

app.listen(3000);
  