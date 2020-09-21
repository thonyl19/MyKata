using System;
using System.Collections;
using CSharp.Model;

namespace CSharp.WebApi {
	public class SampleRepository : ISampleRepository {
		public IEnumerable GetSamples () {
			for (int i = 0; i < 10; i++) {
				yield return new SampleModel () {
					Id = i,
						Data = string.Format ("Data - {0}", i),
						CreatedAt = DateTime.Now
				};
			}
		}
	}

}