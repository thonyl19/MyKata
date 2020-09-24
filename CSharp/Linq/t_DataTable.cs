using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Linq {
    
    /// <summary>
    /// [Note]
    /// 需要先安裝執行
    ///     dotnet add package System.Data.DataSetExtensions --version 4.5.0
    /// </summary>
    [TestClass]
    public class t_DataTable {

        [TestMethod]
        public void t_Base () {
            //虛擬一個空的 Table()
            var _DT = new DataTable();
            //需要利用 AsEnumerable 才能在 Linq 內使用
            var _list = (from g in _DT.AsEnumerable()
                where g.Field<string>("ACTION_LINK_SID") == "AAAA"
                select new
                {
                    /// 如果 DT 的資料格式是必須要使用正確的格式,不然會報錯
                    QC_SEQ = (int)g.Field<decimal>("QC_SEQ"),
                    QC_DATA = g.Field<string>("QC_DATA")
                }
            ).ToList();
        }    
    }
}