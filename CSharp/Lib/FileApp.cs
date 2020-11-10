/*

*/

using Newtonsoft.Json;
using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Serialization;

namespace MyKata.Lib
{

	public class FileApp
	{
		
		public System.IO.TextWriter go_TextWriter;
		public FileMode _FileMode = FileMode.CreateNew;
		public Encoding EncodingType;

		bool IsAppend
		{
			get
			{
				return this._FileMode == FileMode.Append;
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="isAppend">T)自動附加,F)強制複寫</param>
		public FileApp(bool isAppend)
		{
			this._FileMode
				= isAppend
				? FileMode.Append
				: FileMode.Create;
			this.SetEncoding();
		}

		/// <summary>
		/// FileMode.CreateNew -- 己存在的檔案,自動加日期新建
		/// </summary>
		public FileApp()
		{
			this.SetEncoding();
		}

		//public IsoDateTimeConverter timeConverter = new IsoDateTimeConverter { DateTimeFormat = "yyyy-MM-dd HH:mm:ss" };
		public static JsonSerializerSettings json_options = new JsonSerializerSettings()
		{
			DateFormatHandling = DateFormatHandling.MicrosoftDateFormat,
			DateFormatString = "yyyy-MM-dd HH:mm:ss",
			NullValueHandling = NullValueHandling.Ignore,
			Error = (serializer, err) =>
			{
				err.ErrorContext.Handled = true;
			}
		};


		public static string ts_Log(string PathName)
		{
			string _path = System.AppDomain.CurrentDomain.BaseDirectory.Replace(@"bin\Debug", "");
			string _filePath = $@"{_path}Log\{PathName}";
			return _filePath;
		}

		/// <summary>
		/// 在檔案名稱和延伸名稱之間加上標記 ,標記預設為 yyyyMMdd_HHmmss
		/// </summary>
		/// <param name="PathFile"></param>
		/// <returns></returns>
		public static string ts_FileMark(string PathFile, string Mark = null)
		{
			if (Mark == null) Mark = DateTime.Now.ToString("yyyyMMdd_HHmmss");
			string _ext = Path.GetExtension(PathFile);
			Regex _reg = new Regex($"{_ext}\\b",
					RegexOptions.Compiled | RegexOptions.IgnoreCase);
			return _reg.Replace(PathFile, $"_{Mark}{_ext}");
		}




		/// <summary>
		/// 設置 EncodingType(預設為中文 GetEncoding(950))
		/// </summary>
		/// <returns></returns>
		/// http://limitedcode.blogspot.com/2017/06/net-core-big5.html
		/// dotnet add package System.Text.Encoding.CodePages --version 5.0.0
		public virtual FileApp SetEncoding()
		{
			Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
			this.EncodingType = Encoding.GetEncoding(950);
			return this;
		}

		/// <summary>
		/// 寫檔規則
		/// </summary>
		/// <param name="as_PathFile"></param>
		/// <returns></returns>
		string rule_WriteFile(string as_PathFile)
		{
			switch (this._FileMode)
			{
				case FileMode.Append:
					break;
				case FileMode.Create:
					if (File.Exists(as_PathFile))
					{
						File.Delete(as_PathFile);
					}
					break;
				case FileMode.CreateNew:
					if (File.Exists(as_PathFile))
					{
						as_PathFile = FileApp.ts_FileMark(as_PathFile);
					}
					break;
			}
			return as_PathFile;
		}

		/// <summary>
		/// 主要是避免,檔案若是己存在,被覆寫的問題(T:可寫檔)
		/// </summary>
		/// <param name="as_PathFile"></param>
		/// <returns></returns>
		public bool chk_寫檔確認(string as_PathFile)
		{
			bool lb_ = false;
			switch (this._FileMode)
			{
				case FileMode.Create:
					if (File.Exists(as_PathFile))
					{
						File.Delete(as_PathFile);
					}
					break;
				case FileMode.CreateNew:
					if (File.Exists(as_PathFile))
					{
						as_PathFile = FileApp.ts_FileMark(as_PathFile);
					}
					break;
				case FileMode.Append:
					lb_ = true;
					break;
			}
			return lb_;
		}

		public static bool Write_SerializeXml(object ao_obj, string as_FullFileName, bool isMult = true)
		{
			return new FileApp().Write_SerializeXml(ao_obj, as_FullFileName);
		}
		/// <summary>
		/// 執行序列化寫檔
		/// </summary>
		/// <returns></returns>
		public bool Write_SerializeXml(object ao_obj, string as_FullFileName)
		{
			try
			{
				as_FullFileName = rule_WriteFile(as_FullFileName);
				//若不是 CreateNew 狀態,則直接完成寫檔
				go_TextWriter = new StreamWriter(as_FullFileName);
				XmlSerializer lo_XS = new XmlSerializer(ao_obj.GetType());
				lo_XS.Serialize(go_TextWriter, ao_obj);
				return true;
			}
			catch (Exception Ex)
			{
				//_global.go_PR.Set(Ex, "執行序列化寫檔失敗!!");
			}
			finally
			{
				this.Close();
			}
			return false;
		}

		public static bool Write_SerializeJson(object ao_obj, string as_FullFileName, JsonSerializerSettings json_options = null, bool isMult = true)
		{
			return new FileApp().Write_SerializeJson(ao_obj, as_FullFileName, json_options);
		}

		public bool Write_SerializeJson(object ao_obj, string as_FullFileName, JsonSerializerSettings json_options = null)
		{
			json_options = json_options ?? FileApp.json_options;
			try
			{
				as_FullFileName = rule_WriteFile(as_FullFileName);
				string _json = JsonConvert.SerializeObject(ao_obj, json_options);
				this.Write(_json, as_FullFileName);
				return true;
			}
			catch (Exception Ex)
			{
				//_global.go_PR.Set(Ex, "執行序列化寫檔失敗!!");
			}
			finally
			{
				this.Close();
			}
			return false;
		}

		public static object Read_SerializeXml(object ao_obj, string as_FullFileName, bool isMult = true)
		{
			return new FileApp().Read_SerializeXml(ao_obj, as_FullFileName);
		}
		/// <summary>
		/// 讀取 序列化讀檔
		/// </summary>
		/// <returns></returns>
		public object Read_SerializeXml(object ao_obj, string as_FullFileName)
		{
			try
			{
				XmlSerializer lo_XS = new XmlSerializer(ao_obj.GetType());
				System.IO.TextReader lo_TextReader = this.ts_StreamReader(as_FullFileName);
				ao_obj = lo_XS.Deserialize(lo_TextReader);
			}
			catch (Exception Ex)
			{
				//throw new _DBex(Ex, "Read_SerializeFile()執行序列讀檔失敗!!");
			}
			finally
			{
				this.Close();
			}
			return ao_obj;
		}

		/// <summary>
		/// 讀取 序列化讀檔,支援 anonymousTypeObject
		/// </summary>
		/// <returns></returns>
		public T Read_SerializeJson<T>(string as_FullFileName, T anonymousTypeObject, JsonSerializerSettings json_options = null)
		{
			json_options = json_options ?? FileApp.json_options;
			T _obj = default(T);
			try
			{
				TextReader lo_TextReader = this.ts_StreamReader(as_FullFileName);
				string _s = lo_TextReader.ReadToEnd();
				_obj = JsonConvert.DeserializeAnonymousType(_s, anonymousTypeObject, json_options);
			}
			catch (Exception Ex)
			{
				throw new Exception($"Read_SerializeJson 序列讀檔({as_FullFileName})");
			}
			finally
			{
				this.Close();
			}
			return _obj;
		}

		public static T Read_SerializeJson<T>(string as_FullFileName, JsonSerializerSettings json_options = null, bool isMult = true)
		{
			return new FileApp().Read_SerializeJson<T>(as_FullFileName, json_options);
		}

		/// <summary>
		/// 讀取 序列化讀檔
		/// </summary>
		/// <returns></returns>
		public T Read_SerializeJson<T>(string as_FullFileName, JsonSerializerSettings json_options = null)
		{
			json_options = json_options ?? FileApp.json_options;
			T _obj = default(T);
			try
			{
				TextReader lo_TextReader = this.ts_StreamReader(as_FullFileName);
				string _s = lo_TextReader.ReadToEnd();
				_obj = JsonConvert.DeserializeObject<T>(_s, json_options);
			}
			catch (Exception Ex)
			{
				throw new Exception($"Read_SerializeJson 序列讀檔({as_FullFileName})");
			}
			finally
			{
				this.Close();
			}
			return _obj;
		}

		

		/// <summary>
		/// 此程序 是將 檢核檔案是否存及 StreamReader 做合併處理
		/// </summary>
		/// <param name="FilePathName"></param>
		/// <returns></returns>
		public StreamReader ts_StreamReader(string as_PathFile)
		{
			this.chk_File(as_PathFile, true);
			return new StreamReader(as_PathFile, EncodingType);
		}

		/// <summary>
		/// 檢核檔案是否存在(True:存在)(依參數決定,若不存在是否丟出 Exception)
		/// </summary>
		/// <param name="FilePathName"></param>
		/// <returns></returns>
		public bool chk_File(string FilePathName, bool ab_丟出Exception)
		{
			if (File.Exists(FilePathName) == false)
			{
				//_global.go_PR.Set(new Exception("檔案不存在,\n[FilePathName]" + FilePathName));
				if (ab_丟出Exception)
				{
					throw new Exception("檔案不存在,\n[FilePathName]" + FilePathName);
					//_global.go_PR.ThrowEx();
				}
				return false;
			}
			return true;
		}

		public void Close()
		{
			try
			{
				go_TextWriter.Close();
			}
			catch
			{
			}
		}

		public static string Read(string as_FullFileName, bool isMult = true)
		{
			return new FileApp().Read(as_FullFileName);
		}

		public string Read(string FilePathName)
		{
			string ls_Return = "";
			try
			{
				StringBuilder GetDate = new StringBuilder();
				StreamReader SR = this.ts_StreamReader(FilePathName);
				String input;
				while ((input = SR.ReadLine()) != null)
				{
					GetDate.Append(input + "\n");
				}
				SR.Close();
				ls_Return = GetDate.ToString();
			}
			catch (Exception e)
			{
				//_global.go_PR.Set
				//(e
				//, "Read()發生異常 "
				//, "[FilePathName]", FilePathName
				//, "[SetFileCode]", EncodingType.ToString()
				//).ThrowEx();
			}
			return ls_Return;
		}

		/// <summary>
		/// 將指定檔案 讀成 二進位陣列
		/// </summary>
		/// <param name="FilePathName"></param>
		/// <returns></returns>
		public byte[] Binary_Read(string FilePathName)
		{
			byte[] lb_Data = new byte[0];
			try
			{
				StreamReader SR = this.ts_StreamReader(FilePathName);
				long ll_ = SR.BaseStream.Length;
				lb_Data = new byte[ll_];
				for (long i = 0; i < ll_; i++)
				{
					lb_Data[i] = (byte)SR.BaseStream.ReadByte();
				}
				SR.Close();
			}
			catch (Exception Ex)
			{
				//throw new _DBex(Ex, "Binary_Read() 處理發生異常!!");
			}



			return lb_Data;
		}

		/// <summary>
		/// 文字檔寫檔程序
		/// </summary>
		/// <param name="strMsg"></param>
		/// <param name="FilePathName"></param>
		/// <returns></returns>
		public bool Write(string[] strMsg, string as_PathFile)
		{
			try
			{
				as_PathFile = rule_WriteFile(as_PathFile);
				StreamWriter SW = new StreamWriter
					(as_PathFile
					, this.IsAppend
					, this.EncodingType);
				for (int i = 0; i < strMsg.Length; i++)
				{
					SW.WriteLine(strMsg[i]);
				}
				SW.Flush();
				SW.Close();
				return true;
			}
			catch (Exception e)
			{
				//_global.go_PR.Set(e, "Write() 文字檔寫檔程序:發生異常"
				//, "[strMsg]", string.Join("\n", strMsg)
				//, "[FilePathName]", as_PathFile
				//, "[ae_Mode]", this._FileMode.ToString()
				//, "[SetFileCode]", EncodingType.ToString()
				//);
			}
			return false;
		}


		/// <summary>
		/// 文字檔寫檔程序(預設為串接)
		/// </summary>
		/// <param name="strMsg"></param>
		/// <param name="FilePathName"></param>
		/// <returns></returns>
		public bool Write(string strMsg, string FilePathName, bool isSplitLine = true)
		{
			if (isSplitLine)
			{
				string[] tmpArr = strMsg.Split(new char[] { '\n' });
				return this.Write(tmpArr, FilePathName);
			}
			return this.Write(new string[] { strMsg }, FilePathName);
		}
	}
}
