// 给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。（注意：规定B[0] = A[1] * A[2] * ... * A[n-1]，B[n-1] = A[0] * A[1] * ... * A[n-2];）
function multiply(array)
{
    // write code here
    if(array == null){
        return false;
    }
    var arr = [];
    for(var i=0;i<array.length;i++){
        var tempArr = array.filter(function(val,idx){
            return idx!=i;
        });
        var temp = 1;
        tempArr.map(function (val){
            temp *= val;
        });
        arr.push(temp);
    }
    return arr;
}