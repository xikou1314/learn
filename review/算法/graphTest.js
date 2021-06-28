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

  function addEdge(v, w) {
    this.adj[v].push(w)
    this.adj[w].push(v)
    this.edges++
  }

  function show() {
    for (var i = 0; i < this.vertices; i++) {
      var edg = ''
      for (var j = 0; j < this.adj[i].length; j++) {
        edg = edg + this.adj[i][j] + ' '
      }
      console.log(i + '->' + edg)
    }
  }

  function dfs(v) {
    // 借用stack
    var stack = [v]
    var result = []
    var current
    while (stack.length > 0) {
      current = stack.pop()
      result.push(current)
      for (var i = 0; i < this.adj[current]; i++) {
        stack.push(this.adj[current][i])
      }
    }
  }

  function bfs(v) {
    // 借用queue
    var queue = [v]
    while (queue.length > 0) {
      var current = queue.slice()
      queue = []
      while (current.length > 0) {
        var node = current.shift()
        result.push(node)
        this.marked[node] = true
        for (var i = 0; i < this.adj[node].length; i++) {
          if (!this.marked[this.adj[node][i]]) {
            this.marked[this.adj[node][i]] = true
            queue.push(this.marked[this.adj[node][i]])
            this.edgeTo[this.marked[this.adj[node][i]]] = node
          }
        }
      }
    }
    reutn result

  }

  function hasPathTo(i) {
    return this.marked[i]
  }

  function pathTo(i, j) {
    var result = [j]
    if(!this.hasPathTo(j)) return []
    while(j != i || j != undefined) {
      j = this.edgeTo[j]
      result.push(j)
    }
    if (j == i) {
      return result.reverse()
    }
    return []
  }
}