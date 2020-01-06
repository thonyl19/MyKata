var _Array = {
    //https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    from:(()=>{
        //將字串轉成字元陣列
        var t = Array.from("1234");
        t
        //產生指定個數的遞增數字陣列
        var g = Array.from({length: 5}, (v, i) => i);
        g
    }),
    of:(()=>{
        //把傳入參數轉成陣列 
        var t = Array.of(1,2,3);
        t
    }),
    concat:(()=>{
        const array1 = ['a', 'b', 'c'];
        const array2 = ['d', 'e', 'f'];
        console.log(array1.concat(array2));
        array1
        array2
    }),
    copyWithin:(()=>{
        var array1 = ['a', 'b', 'c', 'd', 'e'];

        // copy to index 0 the element at index 3
        console.log(array1.copyWithin(0, 2, 7));
        // expected output: Array ["d", "b", "c", "d", "e"]

        // copy to index 1 all elements from index 3 to the end
        console.log(array1.copyWithin(1, 3));
    })
    ,splice:(()=>{
        var myFish = ["angel", "clown", "mandarin", "sturgeon"];
        var removed = myFish.splice(2, 2, "drum");
        myFish
        removed
        var removed1 = myFish.splice(-2, 1);
        removed1
        myFish.splice(0);
        myFish
    })()
}


var t = {
    t1:(()=>{
        var name = "t",age=17;
        var obj = {
            name:"x"
            ,objAge:this.age
            ,fn:function(){
                this.name 
                this.objAge
                return `${this.name} - ${this.age}`
            }
        }
        var db = {
            name:'db',
            age:99
        }

        console.log(obj.objAge);
        obj.objAge = 17;
        console.log(obj.fn.call(db));

        var fav = "x";
        function fn(){
            return this.fav;
        }
        var x  = fn();
        x

    })

}

var arr = [];
var fn_1 = (s,times)=>{
    arr.push(s);
    arr.push(s);
    var next = s+s;
    for (let index = 0; index < times; index++) {
        s = arr[index] + arr[index+1];
        arr.push(s);
    }
    return arr;
}
function fibonacci(num) {
	// 1 和 2 的費氏數列是 1
	if(num === 1 || num === 2) {
		return 1;
	}
	// n > 2 的費氏數列是 n - 1 的費氏數列加上 n - 2 的費氏數列
	return fibonacci(num - 1) + fibonacci(num - 2);
}
var zz = fn(2,5);
zz