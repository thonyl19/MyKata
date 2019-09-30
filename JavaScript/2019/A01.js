let fn_A = (n)=>{
    if (n == 0 ) return 0 ;
    return (n&1?n:-n) + fn_A(n-1);
}

let fn = (total,val=1)=>{
    var cv = val % 2 == 1 ? val: -val;
    if (val > total ) return 0 ;
    return cv + fn(total,val+1);
}

console.log(fn_A(3))