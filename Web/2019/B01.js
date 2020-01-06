//逆向
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        //console.log(i,j);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//順向,實作效果不好 
function shuffle1(array) {
    var max = array.length;
    for (let i = 0 ; i < max-1 ; i++) {
        let j = Math.floor(Math.random() * (max  ));
        console.log(i,j);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let count = {
    '123':0,
    '132':0,
    '213':0,
    '231':0,
    '321':0,
    '312':0,
}
for (var i = 0 ; i < 600; i++){
    let key = shuffle([1,2,3]).join('');
    count[key]++;
}

for (let k in count){
    console.log(`${k}:${count[k]}`);
}