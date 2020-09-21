using System.Collections;
using System.Collections.Generic;
using CSharp.Model;

namespace CSharp.WebApi {
	public class SampleService : ISampleService {
		public ISampleRepository SampleRepository { get; set; }

		//// 尚未套用Ioc，暫時直接初始化
		public SampleService () : this (new SampleRepository ()) { }

		public SampleService (ISampleRepository sampleRepository) {
			this.SampleRepository = sampleRepository;
		}

		IEnumerable ISampleService.GetSamples () {
			return this.SampleRepository.GetSamples ();
		}
	}
}