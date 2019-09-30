let fn = {
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    GenArray(){
        let arr = []
        for (x of "ABCD"){
            for (i=1 ; i < 14 ;i++){
                arr.push(x+i);
            }
        }
        return arr ;
    }
}
let A = fn.shuffle(fn.GenArray());
console.log(A,A.length);