
const v8n = require('v8n');
var schema ={
	User:{
		UserSId:null
	},
	Log:{
		LogSID:null
		,TaskSID:null
		,note:null
		,work_times:null
		,start_time:null
		,end_time:null
		,Loger:null
		,editTime:null
		,mapSID:null
		,flag:null
	}
}
var vPingTasks={
	get sql(){
		var _sql01 = `
		select *
		from 	[@JobList] v11
		where 	v11.nickname = :user 
				and v11.start_time = :start_time
		`;
		var _sql02 =  (isLeftJoin = true) => {
			return  `
			SELECT 	v0.*
					,v1.LogSID
					,v1.start_time
					,v1.work_times
					,v1.Task
					,v1.TaskType
					,v1.Root
					,v1.Note
					,iif(v0.TaskSID is null,v1.TaskSID,v0.TaskSID) as  _TaskSID
					,iif(v0.TaskSID is null,v1.Task,v0.TaskPath) as  _TaskPath
			FROM 	[@PingTasks] v0
					${isLeftJoin?"LEFT JOIN":"RIGHT JOIN"} (
						${_sql01}
						) v1
						ON v1.TaskSID = v0.TaskSID
			WHERE	${isLeftJoin?"v0.Owner = :user ":"v0.TaskSID is null"}
			`
		};
		var _sql03 = `
			${_sql02()}
			UNION ALL
			${_sql02(false)}
		`
		return _sql03;
	},

	get arg(){
		return {user:null,start_time:null};
	}
}


module.exports = {
	schema,
	User:{
		Select:{
			sql:`
			SELECT 	* 
				FROM	[User] 
				WHERE	:UserSId is null
						OR (:UserSId is not null 
							And UserSId = :UserSId)
			`,
			get arg(){
				let {UserSId} = schema.User;
				return {UserSId};
			} 
		},
		Tasks:{
			sql:`
			SELECT 	* 
			FROM	[@TaskPath] 
			WHERE	(:UserSId is null
						OR UserSId = :UserSId)
					AND (:Task is null
						OR (:Task is not null AND FullName like :Task));`,
			get arg(){
				return {UserSId:null,Task:null};
			} 
		}
	}
	,Log:{
		Select:{
			sql:`
			SELECT 	* 
			FROM 	Log 
			WHERE	:LogSID is null
					OR (:LogSID is not null 
						And LogSID = :LogSID)
			`,
			get arg(){
				let {LogSID} = schema.Log;
				return {LogSID};
			}
		},
		Insert:{
			sql:`
			INSERT 	INTO Log_
			SELECT 	:TaskSID as TaskSID 
					,:note as [note]
					,:work_times as work_times
					,:start_time as start_time
					,:end_time as end_time
					,:Loger as Loger
					,:mapSID as mapSID
			` ,
			get arg(){
				return Object.assign({},schema.Log);
			}
		},
		Update:{
			sql:`
			UPDATE	Log 
			SET		TaskSID = IIf(isnull(:TaskSID),TaskSID,:TaskSID),
					[note] = IIf(isnull(:note),note,:note),
					work_times = IIf(isnull(:work_times),work_times,:work_times),
					start_time = IIf(isnull(:start_time),start_time,:start_time),
					end_time = IIf(isnull(:end_time),end_time,:end_time),
					Loger = IIf(isnull(:Loger),Loger,:Loger),
					mapSID = IIf(isnull(:mapSID),mapSID,:mapSID),
					flag = IIf(isnull(:flag),flag,:flag)
			WHERE	LogSID = :LogSID
			` ,
			get arg(){
				return Object.assign({},schema.Log);
			}
		},
	},
	vJobList:{
		sql:`
		SELECT 	* 
		FROM 	vJobList
		WHERE	nickname = :loger 
				AND (:start_time is null
					OR (:start_time is not null 
						And start_time = :start_time))
		` ,

		get arg(){
			return {loger:null,start_time:null};
		}
	},
	vPingTasks
};