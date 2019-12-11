

let result = [];

let zhixing = 0;

// 划分层级


function diff(oldTree, newTree) {
    var index = 0;    // 当前层级数
    var patches = {}; // 当前层级的补丁

}

function dfsWalk(oldNode, newNode, index, patches) {
    
}


const diffLeafs = function(beforeLeaf, afterLeaf) {
    zhixing ++;
    console.log(beforeLeaf,afterLeaf);
    let count = Math.max(beforeLeaf.children.length, afterLeaf.children.length);

    for(let i = 0; i < count; i++) {
        const beforeTag = beforeLeaf.children[i];
        const afterTag = afterLeaf.children[i];

        if(beforeTag === undefined) {
            result.push({type: "add", element: afterTag});
        } else if (afterTag === undefined) {
            result.push({type: "add", element: beforeTag});
        } else if (beforeTag.tagName !== afterTag.tagName) {
            result.push({type: "remove", element: beforeTag});
            result.push({type: "add", element: afterTag});
        } else if (beforeTag.innerHTML !== afterTag.innerHTML) {
            if(beforeTag.children.length === 0) {
                result.push({
                    type: "changed",
                    beforeElement: beforeTag,
                    afterElement: afterTag,
                    html: afterTag.innerHTML
                });
            } else {
                diffLeafs(beforeTag,afterTag);
            }
        }


    }

    return result;

}

let leaf1 = document.getElementById('leaf1');
let leaf2 = document.getElementById('leaf2');

diffLeafs(leaf1,leaf2);

console.log(zhixing);
console.log(result);