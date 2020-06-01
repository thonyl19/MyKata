
import * as fs from 'fs';

/**
 * https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 * 基本 reducer 用法
 */
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

var t_map = (()=>{
  var arr = Promise.all(array1.map(el=>{
    return Promise.resolve(el+1);
  }))
  arr;
  arr.then(val=>{
    val;
  });
})();

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));


/**
 * https://medium.com/@mengweichen/%E5%A6%82%E4%BD%95%E7%94%A8async-await%E5%AF%A6%E4%BD%9Cpromise%E7%9A%84throttle-37e1b1d471a3
 * 陣列  async 循序執行
 */
var delayPromise = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(Date());
      console.log(data);
      resolve(data);
    }, 1000 * data);
  });

// var r1 = [1, 2, 3, 4].reduce(async(acc, current) => {
//     if (acc) await acc;
//     return await delayPromise(current);
//   })

// console.log(r1);

// var r2 = ['A', 'B', 'C','D'].reduce(
//     (p, current) => p.then(() => delayPromise(current)),
//     Promise.resolve()
// )
//console.log(r2);

// const asyncWay = async(dataArray) => {
//     for(const i in dataArray) {
//       await delayPromise(dataArray[i]);
//     }
//   }
// asyncWay([1, 2, 3, 4])

//併發執行
const problem = [1, 2, 4, 5].map(delayPromise)

//var p1 = await Promise.all(problem);

// var  p1_fn= async ()=>{
//   return await 
// }

//console.log(p1);

var resolvedPromisesArray:any[] = [Promise.resolve("1234"),Promise.resolve(33), Promise.resolve(44)];
var prm_test = ()=>{return Promise.resolve("prm_test");}

let ts = async()=>{
  let p = await Promise.all(resolvedPromisesArray);
  // .then((val)=>{
  //   return val;
  // })
  //console.log(await p);
  return p;
}



var tsGen = function *(){

  let p = yield Promise.all(resolvedPromisesArray);
  return p;
}

var xfn = async ()=>{
  console.log
    ([ts()
      ,await ts()
      ,await Promise.all(resolvedPromisesArray)
      ,await tsGen()
      //只能傳回 promse
      ,prm_test()
      //取回 實際值
      , await prm_test()
    ]);
}
xfn();

// immediately logging the value of pa
 
var sleep = function(para) {
  return new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(para * para)
      }, 1000)
  })
}
async function asyncSleep (para){
  return await sleep(para)
 }
 
