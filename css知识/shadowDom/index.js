class PopUpInfo extends HTMLElement {
  constructor(props) {
    // 必须首先调用 super方法
    super(props);

    // 元素的具体功能写在下面
    var shadow = this.attachShadow({ mode: "open" });

    // 创建 span
    var wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    var icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);
    var info = document.createElement("span");
    info.setAttribute("class", "info");

    // 获取属性的内容并将内容添加到 info 元素内 可能因为浏览器的原因 获取不到属性
    var text = this.getAttribute("text");
    info.textContent = text;
    // 插入 icon
    var imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/default.jpg";
    }
    var img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    // 为 shadow DOM 添加一些 CSS 样式
    var style = document.createElement("style");

    style.textContent = `
.wrapper {
  position: relative;
}

.info {
  font-size: 0.8rem;
  width: 200px;
  display: inline-block;
  border: 1px solid black;
  padding: 10px;
  background: white;
  border-radius: 10px;
  opacity: 0;
  transition: 0.6s all;
  position: absolute;
  bottom: 20px;
  left: 10px;
  z-index: 3;
}

img {
  width: 1.2rem;
}

.icon:hover + .info, .icon:focus + .info {
  opacity: 1;
}`;

    // 将所创建的元素添加到 Shadow DOM 上
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}
