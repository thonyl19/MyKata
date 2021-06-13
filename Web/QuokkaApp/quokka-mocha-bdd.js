/*
[Ref]
https://github.com/cmstead/quokka-mocha-bdd
經測試 不 work
*/

import * as _ from 'lodash';
import path from "path";
 
(()=>{
    ({
        "plugins": ["quokka-mocha-bdd"],
        "quokka-mocha-bdd": {
            "interface": "tdd"
        }
    })
    describe('Array', function () {
        describe('#indexOf()', function () {
          it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
          });
        });
      });
    
    if(typeof global.runQuokkaMochaBdd === 'function') {
        runQuokkaMochaBdd();
    }
})()