<%@ WebHandler Language="C#" Class="CSharp.Ashx.Test" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSharp.Ashx
{
    /// <summary>
    /// Handler1 的摘要描述
    /// </summary>
    public class Test : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World``````");
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
