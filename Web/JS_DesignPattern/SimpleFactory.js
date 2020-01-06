/*
[Ref]
    https://www.dofactory.com/javascript/factory-method-design-pattern
*/
function Factory(){
    this.Create = (type)=>{
        var prd;
        switch(type){
            case "Tea":
                prd = new Tea();
                break;
            case "Coffee":
                prd = new Coffee();
                break;
            case "Juice":
                prd = new Juice();
                break;
        }
        prd.type = type;
        prd.say = function(){
            return `${this.type} Price is ${this.Price}`;
        }
        return prd;
    }
}

var Tea = function(){
    this.Price = "$10"
}
var Coffee = function(){
    this.Price = "$20"
}
var Juice = function(){
    this.Price = "$15"
}

var prds = [];
var factory = new Factory();
prds.push(factory.Create("Tea"));
prds.push(factory.Create("Coffee"));
prds.push(factory.Create("Juice"));

prds.forEach(el => {
    console.log(`${el.say()}`);
});
