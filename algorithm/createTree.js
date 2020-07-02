function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function createTree(arr) {
    var root = new TreeNode(arr[0]);
    var result = [];
    var i = 1;
    result.push(root);
    while(result.length != 0) {
        var r = result.shift();
        if (i < arr.length - 1) {
            r.left = new TreeNode(arr[i]);
            result.push(r.left);
            r.right = new TreeNode(arr[i+1]);
            result.push(r.right);
        }
        i += 2;
    }
    return root;
}

export default {
    createTree
}