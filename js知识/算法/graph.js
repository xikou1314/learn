/**
 * 一个简单的图和图算法
 * @constructor
 */
function Graph(v) {
  this.vertices = v //顶点
  this.edges = 0 //边
  this.adj = [] //定义数组
  this.marked = [] //标记是否已访问 false为未访问 true为访问过了
  for (var i = 0; i < this.vertices; i++) { //定义二维数组
    this.adj[i] = []
    this.marked[i] = false
  }
  this.edgeTo = [] //从一个顶点到下一个顶点的所有边
  this.addEdge = addEdge //添加顶点
  this.show = show //显示顶点
  this.dfs = dfs //深度优先搜索
  this.bfs = bfs //广度优先搜索

  this.hasPathTo = hasPathTo //是否有路径
  this.pathTo = pathTo //最短路径
}

//添加顶点
function addEdge(v, m) {
  this.adj[v].push(m)
  this.adj[m].push(v)
  this.edges++
}

//显示顶点
function show() {
  for (var i = 0; i < this.vertices; i++) {
    var edges = ''
    for (var j = 0; j < this.adj[i].length; j++) {
      if (this.adj[i][j]) {
        edges += this.adj[i][j] + ' '
      }
    }
    console.log(i + '->' + edges)
  }
}

//深度优先搜索
function dfs(v) {
  this.marked[v] = true
  if (this.adj[v] !== undefined) {
    console.log(v + '该节点被访问了')
  }
  for (var w in this.adj[v]) {
    var current = this.adj[v][w]
    if (!this.marked[current]) {
      this.dfs(current)
    }
  }
}

//广度优先搜索
function bfs(v) {
  var queue = []
  this.marked[v] = true
  queue.push(v)
  while (queue.length > 0) {
    var s = queue.shift()
    if (s !== undefined) {
      console.log(s + '该节点被访问了')
    }
    for (var w in this.adj[s]) {
      var current = this.adj[s][w]
      if (!this.marked[current]) {
        this.marked[current] = true
        this.edgeTo[current] = s
        queue.push(current)
      }
    }
  }
}

//是否有路径
function hasPathTo(v) {
  return this.marked[v]
}
//最短路径
function pathTo(start, to) {
  var source = 0
  if (!this.hasPathTo(to)) return undefined
  var path = []
  var i
  for (i = v;
    (i != start || i != undefined); i = this.edgeTo[i]) {
    path.push(i)
  }
  if (i == start) {
    path.push(start)
    return path
  } else {
    return undefined
  }

}

var graph = new Graph(6)
graph.addEdge(0, 1)
graph.addEdge(0, 2)
graph.addEdge(2, 4)
graph.addEdge(1, 3)
graph.addEdge(3, 4)
graph.addEdge(3, 5)
graph.addEdge(4, 5)
graph.show()
console.log('=======深度优先搜索=========')
// graph.dfs(0)
console.log('=======广度优先搜索=========')
graph.bfs(0)
var paths = graph.pathTo(5)
var str = ''
while (paths.length > 0) {
  if (paths.length > 1) {
    str += paths.pop() + '->'
  } else {
    str += paths.pop()
  }
}
console.log(str)