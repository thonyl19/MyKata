const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')();
const cors =require('@koa/cors');
//const parameter = require('koa-parameter');
const morgan =require('morgan');


//有空再試
const {KoaRouterApp} = require('../QuokkaApp/KoaApp');
const {mdb_demo1:mdb_demo} = require('../QuokkaApp/db/mdb_app');


const app = new koa();
//parameter(app); 

var user = {
	'sid/:sid':{
		async r(ctx,next){
			// ctx.verifyParams({
			// 	sid: { type: "number"}
			// })
			let {sid} = ctx.params;
			var _r = await mdb_demo.User.Select({UserSId:sid}).exec();
			ctx.body = _r ;
		}
	}
}
var log = {
	'':{
		async c(ctx,next){
			let {sid} = ctx.params;
			var _r = await mdb_demo.Log.Select({LogSID:sid}).exec();
			ctx.body = _r ;
		   },
		async u(ctx,next){
			//ctx.request.body
			let arg = ctx.request.body;
			var _r = await mdb_demo.Log.Update(arg).exec();
			ctx.body = arg ;
	   	},
	},
	'sid/:sid':{
		async r(ctx,next){
 			let {sid} = ctx.params;
			var _r = await mdb_demo.Log.Select({LogSID:sid}).exec();
			ctx.body = _r ;
		}
	},
	'joblist':{
		async r(ctx, next){
			//let  = ctx.params;
			let {start_time = null} = ctx.query;
			var _r = await mdb_demo.Log.JobList({start_time}).exec();
			ctx.body = _r ;
		}
	}
}

var opction = {
	//http://192.168.0.104:3000/api/opction/grp_type/taskSts
	'grp_type/:grp_type':{
		async r(ctx,next){
			let {grp_type} = ctx.params;
			console.log(grp_type);
			var _r = await mdb_demo.Opction.Select({grp_type}).exec();
			ctx.body = _r ;
		}
	}
}
var view = {
	':view':{
		async r(ctx, next){
			let {view} = ctx.params;
			var _sql = `select * from [${view}];`;
			var _r = await mdb_demo.Exec(_sql);
			ctx.body = _r ;
		}
	},
	
}
 
var employe = {
	''(){},
	'id/:id':{
		async c(ctx,next){},
		async r(ctx,next){
			let {id} = ctx.params;
			ctx.body = {id};
		}
	}
}
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
	'/api/':{employe,user,view,opction,log},
	'/page':page
};
KoaRouterApp.Mode_C(_router,Router);
/*
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();


 

//http://192.168.0.104:3000/api/opction/taskSts

Router.get('/api/opction/:grp_type',async(ctx, next)=>{
	let {grp_type} = ctx.params;
	var _r = await mdb_demo.Opction.Select({grp_type}).exec();
    ctx.body = _r ;
})
Router.get('/api/user/:sid',async(ctx, next)=>{
	let {sid} = ctx.params;
	var _r = await mdb_demo.User.Select({UserSId:sid}).exec();
    ctx.body = _r ;
})
*/

console.log({mdb_demo});
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
//app.use(index);
app.use(bodyParser());
app.use(Router.routes());
app.use(morgan('dev'));

app.listen(3000);
 