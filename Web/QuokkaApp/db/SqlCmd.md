### 一次式更新語法
[Ref]
    https://blog.csdn.net/weixin_44671994/article/details/87720196?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
```
    --將 B0.PARAMETER_NAME 更新到 A0.REPORT 
    UPDATE 	ZZ_OPER_WORKT_SUMMARY
    SET 	REPORT = B0.PARAMETER_NAME
    FROM 	ZZ_OPER_WORKT_SUMMARY A0
	    	INNER JOIN AD_PARAMETER B0
		    	ON B0.PARAMETER_NO = A0.REPORT_TYPE
```