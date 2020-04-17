// 重建二叉树问题
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function reConstructBinaryTree(pre, vin)
{
    // 通过先序和中序遍历还原二叉树
    // 分析遍历的特点 先序遍历 第一个元素是根节点
    // 中序遍历 根节点在中间 根节点的左边是左子树 根节点的右边是右子树
    if(pre.length <= 0) {
        return null;
    }
    var node = new TreeNode(pre[0]);
    var nodeindex = vin.indexOf(pre[0]);
    // 取出左子树
    // 取出右子树
    node.left = reConstructBinaryTree(pre.slice(1,nodeindex+1),vin.slice(0,nodeindex));
    node.right = reConstructBinaryTree(pre.slice(nodeindex+1),vin.slice(nodeindex+1));

    return node;
}

// 后序遍历
function postOrder (node) {
    var result = [];
    postOrderFn(node, result);
    return result;
}

function postOrderFn (node, data) {
    if(node != null) {
        postOrderFn(node.left, data);
        postOrderFn(node.right, data);
        data.push(node.val);
    }
}

// 先序遍历
function preOrder (node) {
    var result = [];
    preOrderFn(node, result);
    return result;
}

function preOrderFn (node, data) {
    if(node != null) {
        data.push(node.val);
        preOrderFn(node.left, data);
        preOrderFn(node.right, data); 
    }
}

function reConstructBinaryTree1(post, vin)
{
    // 通过后序和中序遍历还原二叉树
    // 分析遍历的特点 后序遍历 最后一个元素是根节点
    // 中序遍历 根节点在中间 根节点的左边是左子树 根节点的右边是右子树
    var length = post.length;

    if(length <= 0) {
        return null;
    }
  
    var node = new TreeNode(post[length]);
    var nodeindex = vin.indexOf(post[length]);
    // 取出左子树
    // 取出右子树
    node.left = reConstructBinaryTree1(post.slice(0,nodeindex),vin.slice(0,nodeindex));
    node.right = reConstructBinaryTree1(post.slice(nodeindex, length - 1),vin.slice(nodeindex+1));

    return node;
}




var tree = reConstructBinaryTree([4,3,2,1,7,6,5,8],[1,2,3,4,5,6,7,8]);

console.log('后序遍历',postOrder(tree));

var tree1 = reConstructBinaryTree1([1,2,3,5,6,8,7,4],[1,2,3,4,5,6,7,8]);

console.log('先序遍历',preOrder(tree));

