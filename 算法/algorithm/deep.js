function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function TreeDepth(pRoot)
{

    // write code here
    if(!pRoot) return 0;
    var deep = 0;
    var temp = [];
    temp.push(pRoot);

    while(temp.length>0) {
        deep ++;
        var size = temp.length;
        var current = []
        for(var i=0; i<size; i++) {
            if(temp[i].left) {
                current.push(temp[i].left);
            } else if(temp[i].right) {
                current.push(temp[i].right);
            }
        }
        temp = [].concat(current);
    }

    return deep;
}

var node1 = new TreeNode(1);
var node2 = new TreeNode(2);
var node3 = new TreeNode(3);
node1.left = node2;
node2.left = node3;
console.log(TreeDepth(node1));
