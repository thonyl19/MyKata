<%@ WebHandler Language="C#" Class="CSharp.Test" %>
using System;
using System.Collections.Generic;
using System.Web;
//using Genesis.Gtimes.Common;
//using Genesis.Gtimes.ADM;

namespace CSharp.Ashx
{
    public class Test : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            Case1(context);
        }
        /// <summary>
        /// 基本用法
        /// </summary>
        /// <param name="context"></param>
        void Case0(HttpContext context) { 
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World``````");
        }

        /// <summary>
        /// 進階-使用參數
        /// </summary>
        /// <param name="context"></param>
        void Case1(HttpContext context) {
            var code = "";
            /*
            var ENCODE_FORMAT_NO = context.Request["ENCODE_FORMAT_NO"];
            DBController dbc = new DBController();
            if (!string.IsNullOrEmpty(ENCODE_FORMAT_NO)) {
                var EnInfo = new EncodeFormatUtility.EncodeFormatInfo
                    (dbc, ENCODE_FORMAT_NO
                    , EncodeFormatUtility.IndexType.No);
                if (EnInfo.ENABLE_FLAG == "F" && EnInfo.DESCRIPTION == "API") {
                    var _code = EncodeFormatUtility.Coder.GetCodes
                        (dbc
                        , "AdminTest"
                        , EnInfo
                        , 1
                        , new Dictionary<EncodeFormatUtility.ParameterType, object>() {
                            //{ EncodeFormatUtility.ParameterType.LOT, lotNo },
                        }
                        //是否自動 commit , T)則會直接把 code 寫入 AD_ENCODE_FORMAT_CONTROL
                        , true);
                    code = _code.Codes[0];
                }

            }
            context.Response.ContentType = "text/plain";
            */
            context.Response.Write(code);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
