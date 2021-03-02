const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')();
const cors =require('@koa/cors');
//const parameter = require('koa-parameter');
const morgan =require('morgan'); 
 

//有空再試
const {KoaRouterApp} = require('../QuokkaApp/KoaApp');
const {mdb_demo1} = require('../QuokkaApp/db/mdb_app');

const app = new koa();
//parameter(app); 

var user = {
	'sid/:sid':{
		async r(ctx,next){
			// ctx.verifyParams({
			// 	sid: { type: "number"}
			// })
			let {sid} = ctx.params;
			var _r = await mdb_demo1.User.Select({UserSId:sid}).exec();
			ctx.body = _r ;
		}
	},
	':UserSId/task/:Task':{
		async r(ctx,next){
			var _r = await mdb_demo1.User.Tasks(ctx.params).exec();
			ctx.body = _r ;
		}
	}
}
var log = {
	'':{
		async c(ctx,next){
			var _r = await mdb_demo1.Log.Insert(ctx.params).exec();
			ctx.body = _r ;
		   },
		async u(ctx,next){
			//ctx.request.body
			let arg = ctx.request.body;
			var _r = await mdb_demo1.Log.Update(arg).exec();
			ctx.body = arg ;
	   	},
	},
	'sid/:sid':{
		async r(ctx,next){
 			let {sid} = ctx.params;
			var _r = await mdb_demo1.Log.Select({LogSID:sid}).exec();
			ctx.body = _r ;
		}
	},
	
}
var joblist = {
	'user/:loger':{
		async r(ctx, next){
			var _r = await mdb_demo1.Log.JobList(ctx.params).exec();
			ctx.body = _r ;
		}
	},
	'user/:user/start_time/:start_time':{
		async r(ctx, next){
			var _r = await mdb_demo1.Log.PingTasks(ctx.params).exec();
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
			var _r = await mdb_demo1.Opction.Select({grp_type}).exec();
			ctx.body = _r ;
		}
	}
}
var view = {
	':view':{
		async r(ctx, next){
			let {view} = ctx.params;
			var _sql = `select * from [${view}];`;
			console.log({view:_sql})
			var _r = await mdb_demo1.Exec(_sql);
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
	'/api/':{employe,user,view,opction,log,joblist},
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
 
console.log({mdb_demo1});
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
//app.use(index);
app.use(bodyParser());
app.use(Router.routes());
app.use(morgan('dev'));

app.on('error', (err, ctx) => {
	console.log({koa_err:err});	
});  

app.listen(3000);
  