/*
QueryBuilderFilterRule  個別案例
*/
        public IResult MLotStarData(string sid)
        {
            IResult result = new Result(true);
            try
            {
                PagerQuery obj = PagerQuery.baseSet();
                obj.Conditions = new QueryBuilderFilterRule()
                {
                    Condition = "and",
                    Rules = new List<QueryBuilderFilterRule>()
                    {
                        new QueryBuilderFilterRule()
                        {
                            Condition = "and",
                            Operator = "equal",
                            Id = "PARTNO_SID",
                            Field = "PARTNO_SID",
                            Type = "string",
                            Value = new string[] { sid },
                        }
                    }
                };
                obj.Sort = new SortRule() { Name = "CREATE_DATE" };
                result = this.MLotStar_WaitRelease(obj);
            }
            catch (Exception ex)
            {
                result = new Result(ex.Message);
            }

            return result;
        }
