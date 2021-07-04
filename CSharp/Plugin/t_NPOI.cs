using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.HPSF;
using NPOI.POIFS.FileSystem;
using NPOI.SS.UserModel;
using ExcelReport;
using ExcelReport.Driver.NPOI;
using ExcelReport.Renderers;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using System.Drawing;
using MyKata.Lib;

namespace CSharp.Plugin {
    [TestClass]
    public class t_NPOI {
        static HSSFWorkbook hssfworkbook;

        public static class fill_mode
        {
            public static string Roster => nameof(Roster);
 
        }

        static void InitializeWorkbook()
        {
            hssfworkbook = new HSSFWorkbook();
            //创建一个DocumentSummaryInformation条目
            DocumentSummaryInformation dsi = PropertySetFactory.CreateDocumentSummaryInformation();
            dsi.Company = "NPOI Team";
            hssfworkbook.DocumentSummaryInformation = dsi;
            //创建一个汇总信息条目
            SummaryInformation si = PropertySetFactory.CreateSummaryInformation();
            si.Subject = "NPOI SDK Example";
            hssfworkbook.SummaryInformation = si;
        }

        static void WriteToFile()
        {
            //将工作簿的流数据写入根目录
            FileStream file = new FileStream(@"~test.xls", FileMode.Create);
            hssfworkbook.Write(file);
            file.Close();
        }

        /// <summary>
        /// [Ref]https://www.cjavapy.com/article/754/
        /// </summary>
        [TestMethod]
        public void t_第一個基本測例 () {
            this._Base();
            WriteToFile();
        }
        public pack _Base(){
            InitializeWorkbook();
            ISheet sheet = hssfworkbook.CreateSheet("ICell comments in POI HSSF");
            //创建绘图族长。这是所有形状(包括单元格注释)的顶级容器。
            IDrawing patr = (HSSFPatriarch)sheet.CreateDrawingPatriarch();
            //在第3行创建一个单元格
            ICell cell1 = sheet.CreateRow(3).CreateCell(1);
            cell1.SetCellValue(new HSSFRichTextString("Hello, World"));
            return new pack(patr, cell1 ) ;

        }

        [TestMethod]
        public void t_增加註解() {
            var _pack = this._Base();
            this._增加註解(_pack);
            WriteToFile();
        }

        public pack _增加註解(pack _pack){
            IComment comment1 = _pack.patr.CreateCellComment(new HSSFClientAnchor(0, 0, 0, 0, 4, 2, 6, 5));
            // 在注释中设置文本
            comment1.String = (new HSSFRichTextString("We can set comments in POI"));
            //设置评论作者。
            //当您将鼠标移到已注释的单元格上时，您可以在状态栏中看到它
            comment1.Author = ("Apache Software Foundation");
            // 向单元格分配注释的第一种方法是通过HSSFCell。SetCellComment方法
            _pack.cell.CellComment = (comment1);
            _pack.comment =  comment1;
            return _pack ;

        }

        [TestMethod]
        public void t_修改備註的背景颜色() {
            var _pack = this._增加註解(this._Base());

            HSSFComment comment2 = (HSSFComment)_pack.patr.CreateCellComment(new HSSFClientAnchor(0, 0, 0, 0, 4, 8, 6, 11));
            //修改评论的背景颜色
            comment2.SetFillColor(204, 236, 255);
            HSSFRichTextString str = new HSSFRichTextString("Normal body temperature");
            //对注释中的文本应用自定义字体
            IFont font = hssfworkbook.CreateFont();
            font.FontName = ("Arial");
            font.FontHeightInPoints = 10;
            font.IsBold = true;
            font.Color = HSSFColor.Red.Index;
            str.ApplyFont(font);
            comment2.String = str;
            //默认情况下注释是隐藏的。这个总是可见的。
            comment2.Visible = true; 
            comment2.Author = "Bill Gates";
            /*
            *为单元格分配注释的第二种方法是隐式指定其行和列。
            *注意，可以设置一个不存在的单元格的行和列。
            它是有效的，commnet是可见的。
            */
            comment2.Row = 6;
            comment2.Column = 1;

            WriteToFile();
        }

        /*
        [Ref]https://github.com/hanzhaoxin/ExcelReport
        */
        [TestMethod]
        public void ExcelReport_简单的参数替换渲染示例代码(){
            Configurator.Put(".xls", new WorkbookLoader());
            var _SrcFile = FileApp.getRelatePath(@"Plugin\Tpl_單行含圖");
            var _SrcImg = FileApp.getRelatePath(@"Img\LogoDev.png");
            ExportHelper.ExportToLocal(_SrcFile, "out.xls",
                new SheetRenderer("参数渲染示例",
                    new ParameterRenderer("String", "Hello World!"),
                    new ParameterRenderer("Boolean", true),
                    new ParameterRenderer("DateTime", DateTime.Now),
                    new ParameterRenderer("Double", 3.14),
                    new ParameterRenderer("Image", Image.FromFile(_SrcImg))
                    )
                );
        }
        public static List<StudentInfo> GetList()
        {
            List<StudentInfo> list = new List<StudentInfo>();

            list.Add(new StudentInfo() { Class = "一班", Name = "XXX01", Gender = true, RecordNo = "YYY0001", Phone = "158******01", Email = "xxx01@live.cn" });
            list.Add(new StudentInfo() { Class = "二班", Name = "XXX02", Gender = false, RecordNo = "YYY0002", Phone = "158******02", Email = "xxx02@live.cn" });
            list.Add(new StudentInfo() { Class = "一班", Name = "XXX03", Gender = true, RecordNo = "YYY0003", Phone = "158******03", Email = "xxx03@live.cn" });
            list.Add(new StudentInfo() { Class = "一班", Name = "XXX04", Gender = true, RecordNo = "YYY0004", Phone = "158******04", Email = "xxx04@live.cn" });

            return list;
        }


        static RepeaterRenderer<StudentInfo> test_Data(string RepeatNmae){
            return new RepeaterRenderer<StudentInfo>(RepeatNmae, t_NPOI.GetList(),
                new ParameterRenderer<StudentInfo>("Name", t => t.Name),
                new ParameterRenderer<StudentInfo>("Gender", t => t.Gender ? "男" : "女"),
                new ParameterRenderer<StudentInfo>("Class", t => t.Class),
                new ParameterRenderer<StudentInfo>("RecordNo", t => t.RecordNo),
                new ParameterRenderer<StudentInfo>("Phone", t => t.Phone),
                new ParameterRenderer<StudentInfo>("Email", t => t.Email)
            );
        }

        /*
        這個案例有點問題,產出的檔案在讀取時,疑似因為 xls 讀取格式的問題,
            圖片都不見了
        */
        [TestMethod]
        public void ExcelReport_多行渲染_含圖(){
            Configurator.Put(".xls", new WorkbookLoader());
            var _SrcFile = FileApp.getRelatePath(@"Plugin\Tpl_多行渲染.xls");
            var _sheet =  new SheetRenderer("多行重复渲染示例",test_Data("rptStudentInfo"));
            ExportHelper.ExportToLocal(_SrcFile, "out.xls", _sheet);
        }

        /// <summary>
        /// 這個案例有點問題,產出的檔案在讀取時,疑似因為 xls 讀取格式的問題,
        ///     原有的樣式格式都不見了
        /// </summary>
        [TestMethod]
        public void ExcelReport_多行渲染(){
            Configurator.Put(".xls", new WorkbookLoader());
            var _SrcFile = FileApp.getRelatePath(@"Plugin\Tpl_多行.xls");
            var _sheet =  new SheetRenderer
                ("学生名册"
                ,test_Data("Roster") 
                , new ParameterRenderer("Author", "hzx")
                );
            ExportHelper.ExportToLocal(_SrcFile, "out.xls", _sheet);
        }
    }

    public class StudentInfo
    {
        public string Name { get; set; }
        public bool Gender { get; set; }
        public string Class { get; set; }
        public string RecordNo { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
    public class pack  {
        public pack(IDrawing patr, ICell cell){
            this.patr = patr;
            this.cell = cell;
              
        }
        public IDrawing patr  {get;set;}
        public ICell cell {get;set;}
        public IComment comment {get;set;}
    }
}