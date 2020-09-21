/*
Ref:https://ithelp.ithome.com.tw/articles/10132856
*/
using System;
using System.Collections;
using CSharp.Model;

namespace CSharp.WebApi {

	public interface ISampleRepository {
		IEnumerable GetSamples ();
	}

}