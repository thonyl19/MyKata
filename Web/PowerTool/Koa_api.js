const {mdb_demo1} = require('../QuokkaApp/db/mdb_app');

console.log({mdb_demo1});
var user = {
	'sid/:sid':{
		async r(ctx,next){
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
	},
	'test':{
		async r(ctx,next){
			 
			ctx.body = `
			A
			B
			` ;
		}
	}
}
var log = {
	'':{
		async c(ctx,next){
			var _r = await mdb_demo1.Log.Insert(ctx.request.body).exec();
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

module.exports = {
	employe,user,view,opction,log,joblist
};