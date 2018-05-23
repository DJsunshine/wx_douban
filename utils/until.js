function starsCount(stars){
  //豆瓣借口的星星是一个十位数 我们取第一个数 作为评分 五星为5
  var num=stars.toString().substring(0,1);
  var array=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1)
    }else{
      array.push(0)
    }
  }
  return array;
}

module.exports ={
  Countstarts: starsCount
}