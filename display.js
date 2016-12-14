module.exports = {
    result: function(result){
        console.log(JSON.stringify(result, null, 2));
    },
    error: function(err){
        console.log(err);
    }
};
