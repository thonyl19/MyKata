var sql = {
	User:{
		Select:`
		SELECT 	* 
			FROM	[User] 
			WHERE	:UserSId is null
					OR (:UserSId is not null 
						And UserSId = :UserSId)
		`
	}
}
module.exports = {
	sql,
	User:{
		Select:`
		SELECT 	* 
			FROM	[User] 
			WHERE	:UserSId is null
					OR (:UserSId is not null 
						And UserSId = :UserSId)
		`
	}
};