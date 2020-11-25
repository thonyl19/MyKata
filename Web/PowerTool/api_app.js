const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')();
const cors =require('@koa/cors');
const morgan =require('morgan');


//有空再試
//const KoaRouterApp = require('../QuokkaApp/KoaApp');
const {mdb_demo} = require('../QuokkaApp/db/mdb_app');

const app = new koa();

// 首頁
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();

//api 註冊的基本 方法  
Router.get('/api/user/:sid',async(ctx, next)=>{
	let {sid} = ctx.params;
	var _r = await mdb_demo.User.Select({UserSId:sid}).exec();
    ctx.body = _r ;
})
Router.get('/api/opction/:grp_type',async(ctx, next)=>{
	let {grp_type} = ctx.params;
	var _r = await mdb_demo.Opction.Select({grp_type}).exec();
    ctx.body = _r ;
})

Router.get('/api/view/:view',async(ctx, next)=>{
	let {view} = ctx.params;
	var _sql = `select * from [${view}];`;
	var _r = await mdb_demo.Exec(_sql);
    ctx.body = _r ;
})



 
console.log({mdb_demo});
// enable CORS - Cross Origin Resource Sharing
app.use(index);
app.use(bodyParser());
app.use(cors());
app.use(Router.routes());
app.use(morgan('dev'));

app.listen(3000);
 