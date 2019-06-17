//module.exports = () => global.message;

module.exports = function (){
    console.log("global.message :: "+ global.message);
    return global.message;
}