
/**
 * [Ref]https://codesays.com/2016/solution-to-cyclic-rotation-by-codility/
 * @param {*} A
 * @param {*} K
 * @returns
 */
function solution_A(A, K) {
    // https://codility.com/demo/results/trainingE3Y6TU-Q79/
    while(A.length && K > 0) {
        A.unshift(A.pop());
        K--;
    }
    return A;
}

// for (let index = 0; index < 10; index++) {
//     var x = Math.floor(Math.random()*10 + 2);
//     console.log(x)
// }

// function foo(arr,min=2,max=10) {
// 	arr = arr || []
// 	if (arr.length >= 5) {
// 		return arr
// 	}
// 	var n =  Math.floor(Math.random() * max + min);
// 	if (arr.includes(n) == -1) {
// 		arr.push(n)
// 	}
// 	return foo(arr)
// }

// var x = foo([]);
// x

