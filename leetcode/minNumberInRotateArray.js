function minNumberInRotateArray(rotateArray)
{
    // write code here
    // {3,4,5,6,7}
    if(rotateArray.length === 0) return 0;
    for (var i=0; i<rotateArray.length - 1; i++) {
        if(rotateArray[i] > rotateArray[i + 1]) {
            return rotateArray[i + 1];
        }
    }
    return rotateArray[0];
}