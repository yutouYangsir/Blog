(function() {
  if (typeof marked === "undefined") {
    document.getElementById("app").innerHTML =
      '<div class="empty">marked.js 加载失败，请检查网络连接</div>';
    return;
  }

  marked.setOptions({ breaks: true, gfm: true });

  var app = document.getElementById("app");
  var layout = document.getElementById("layout");
  var filesSidebar = document.getElementById("filesSidebar");
  var tocSidebar = document.getElementById("tocSidebar");
  var tocOverlay = document.getElementById("tocOverlay");
  var tocPanel = document.getElementById("tocPanel");
  var tocFab = document.getElementById("tocFab");
  var tocBackdrop = document.getElementById("tocBackdrop");
  var backBtn = document.getElementById("backBtn");
  var searchInput = document.getElementById("searchInput");
  var themeToggle = document.getElementById("themeToggle");
  var loadSeq = 0;
  var searchQuery = "";
  var searchTimer = null;
  var currentFolder = "";
  var currentFile = "";
  var currentFiles = [];
  var currentTree = [];
  var currentTocItems = [];
  var currentTocTree = [];
  var expandedDirs = {};
  var tocCollapsed = {};

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function goHome() { location.hash = "#/"; }

  function applyTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("staticblog-theme", dark ? "dark" : "light");
    } catch (e) {}
    themeToggle.title = dark ? "日间模式" : "夜间模式";
  }

  themeToggle.title = document.documentElement.classList.contains("dark") ? "日间模式" : "夜间模式";

  function renderRoute() {
    var hash = location.hash.slice(1) || "/";
    closeTocOverlay();
    if (hash === "/") {
      backBtn.classList.remove("visible");
      layout.classList.remove("has-toc");
      filesSidebar.innerHTML = "";
      tocSidebar.innerHTML = "";
      tocFab.classList.remove('visible');
      if (searchQuery) {
        loadSearch(searchQuery);
      } else {
        loadBlogList();
      }
    } else if (hash.indexOf("/post/") === 0) {
      var parts = hash.slice(6).split("/");
      var folder = decodeURIComponent(parts[0]);
      var file = parts.length > 1 ? decodeURIComponent(parts.slice(1).join("/")) : "";
      window.scrollTo(0, 0);
      backBtn.classList.add("visible");
      layout.classList.add("has-toc");
      loadPost(folder, file);
    } else {
      goHome();
    }
  }

  async function loadBlogList() {
    var seq = ++loadSeq;
    app.innerHTML = '<div class="loading">加载中...</div>';
    try {
      var res = await fetch("api.php?action=list");
      if (!res.ok) throw new Error("HTTP " + res.status);
      var blogs = await res.json();
      if (seq !== loadSeq) return;
      if (!blogs || !blogs.length) {
        app.innerHTML =
          '<div class="empty">暂无博客文章<br><small>在 blogs 目录下创建文件夹并放入 .md 文件即可</small></div>';
        return;
      }
      var html = '<div class="blog-grid">';
      for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i];
        var names = b.mdFiles.join(", ");
        html += '<div class="blog-card" onclick="location.hash=\x27#/post/' +
          encodeURIComponent(b.folder) + '\x27">' +
          '<h2>' + esc(b.name) + '</h2>' +
          '<div class="meta">' + esc(names) + '</div></div>';
      }
      html += '</div>';
      app.innerHTML = html;
    } catch (e) {
      app.innerHTML = '<div class="empty">加载失败：' + esc(e.message) + '</div>';
    }
  }

  async function loadPost(folder, file) {
    var seq = ++loadSeq;
    currentFolder = folder;
    currentFile = file;
    currentFiles = [];
    currentTree = [];
    currentTocItems = [];
    currentTocTree = [];
    expandedDirs = {};
    tocCollapsed = {};
    app.scrollTop = 0;
    filesSidebar.scrollTop = 0;
    tocSidebar.scrollTop = 0;
    app.innerHTML = '<div class="loading">加载中...</div>';
    filesSidebar.innerHTML = "";
    tocSidebar.innerHTML = "";
    tocPanel.innerHTML = "";
    tocFab.classList.remove('visible');
    try {
      var contentUrl = "api.php?action=content&folder=" + encodeURIComponent(folder);
      if (file) contentUrl += "&file=" + encodeURIComponent(file);
      var treeUrl = "api.php?action=tree&folder=" + encodeURIComponent(folder);
      var responses = await Promise.all([fetch(contentUrl), fetch(treeUrl)]);
      if (!responses[0].ok) throw new Error("HTTP " + responses[0].status);
      if (!responses[1].ok) throw new Error("HTTP " + responses[1].status);
      var md = await responses[0].text();
      var treeData = await responses[1].json();
      if (seq !== loadSeq) return;
      currentFiles = Array.isArray(treeData.files) ? treeData.files : [];
      currentTree = Array.isArray(treeData.tree) ? treeData.tree : [];
      if (!currentFile && currentFiles.length) currentFile = currentFiles[0];

      md = md.replace(/!\[\[([^\]]+)\]\]/g, function(match, filename) {
        var name = filename.trim();
        var dir = currentFile.indexOf("/") > -1
          ? currentFile.substring(0, currentFile.lastIndexOf("/"))
          : "";
        // Obsidian 的图片引用是相对当前笔记的，图片统一放在笔记同级的 imgs/ 下
        var rel = /^imgs\//i.test(name) ? name : "imgs/" + name;
        var segs = (dir ? dir.split("/") : []).concat(rel.split("/"));
        // 逐段编码，保留 "/" 作为路径分隔符（整串 encodeURIComponent 会把 "/" 变成 %2F，
        // Apache 默认 AllowEncodedSlashes Off 会直接返回 404）
        var imgPath = "blogs/" + encodeURIComponent(folder) + "/" +
          segs.filter(function(s) { return s !== ""; })
              .map(encodeURIComponent)
              .join("/");
        return "![](" + imgPath + ")";
      });

      var html = marked.parse(md);
      app.innerHTML = '<div class="post" id="postContent">' + html + "</div>";

      buildTOC();
    } catch (e) {
      app.innerHTML = '<div class="empty">加载失败：' + esc(e.message) + '</div>';
    }
  }

  async function loadSearch(q) {
    var seq = ++loadSeq;
    app.innerHTML = '<div class="loading">搜索中...</div>';
    try {
      var res = await fetch("api.php?action=search&q=" + encodeURIComponent(q));
      if (!res.ok) throw new Error("HTTP " + res.status);
      var results = await res.json();
      if (seq !== loadSeq) return;
      if (!results || !results.length) {
        app.innerHTML = '<div class="empty">没有找到与「' + esc(q) + '」相关的内容</div>';
        return;
      }
      var html = '<div class="blog-grid">';
      for (var i = 0; i < results.length; i++) {
        var r = results[i];
        html += '<div class="blog-card" onclick="location.hash=\x27#/post/' +
          encodeURIComponent(r.folder) + '/' + encodeURIComponent(r.file) + '\x27">' +
          '<h2>' + esc(r.folder) + '</h2>' +
          '<div class="meta">' + esc(r.file) + '</div>';
        if (r.snippet) {
          html += '<div class="search-snippet">' + esc(r.snippet) + '</div>';
        }
        html += '</div>';
      }
      html += '</div>';
      app.innerHTML = html;
    } catch (e) {
      if (seq === loadSeq) {
        app.innerHTML = '<div class="empty">搜索失败：' + esc(e.message) + '</div>';
      }
    }
  }

  function buildTOC() {
    var post = document.getElementById("postContent");
    currentTocItems = [];
    if (post) {
      var headings = post.querySelectorAll("h1, h2, h3, h4, h5, h6");
      if (headings.length >= 2) {
        var items = [];
        for (var i = 0; i < headings.length; i++) {
          var h = headings[i];
          var id = "heading-" + i;
          h.id = id;
          items.push({
            id: id,
            text: h.textContent,
            level: parseInt(h.tagName.charAt(1))
          });
        }
        currentTocItems = items;
        currentTocTree = buildTocTree(items);
      }
    }
    renderSidebar();
    updateActiveLink();
  }

  function buildTocTree(items) {
    var root = { children: [] };
    var stack = [{ level: 0, node: root }];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      while (stack.length > 1 && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }
      var node = {
        id: item.id,
        text: item.text,
        level: item.level,
        children: []
      };
      stack[stack.length - 1].node.children.push(node);
      stack.push({ level: item.level, node: node });
    }
    return root.children;
  }

  function renderToc(nodes) {
    var h = "";
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var hasChildren = node.children && node.children.length > 0;
      var collapsed = !!tocCollapsed[node.id];
      h += '<div class="toc-node">';
      h += '<div class="toc-row">';
      if (hasChildren) {
        h += '<button type="button" class="toc-toggle' + (collapsed ? " collapsed" : "") +
          '" data-target="' + node.id + '">' + (collapsed ? "▸" : "▾") + '</button>';
      } else {
        h += '<span class="toc-toggle-placeholder"></span>';
      }
      h += '<a href="#' + node.id + '" class="toc-link toc-h' + node.level +
        '" data-target="' + node.id + '">' + esc(node.text) + '</a>';
      h += '</div>';
      if (hasChildren && !collapsed) {
        h += '<div class="toc-children">' + renderToc(node.children) + '</div>';
      }
      h += '</div>';
    }
    return h;
  }

  function fileHref(folder, file) {
    var parts = file.split("/").map(encodeURIComponent);
    return "#/post/" + encodeURIComponent(folder) + "/" + parts.join("/");
  }

  function renderFileTree() {
    ensureCurrentPathExpanded();
    function renderNodes(nodes, depth) {
      var html = "";
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var pad = 10 + depth * 14;
        if (node.type === "dir") {
          var open = !!expandedDirs[node.path];
          html += '<button type="button" class="file-dir' + (open ? "" : " collapsed") +
            '" data-dir="' + esc(node.path) + '" style="padding-left:' + pad + 'px">' +
            esc(node.name) + '</button>';
          if (open) html += renderNodes(node.children || [], depth + 1);
        } else {
          var cls = node.path === currentFile ? "file-link active" : "file-link";
          html += '<a class="' + cls + '" href="' + fileHref(currentFolder, node.path) +
            '" style="padding-left:' + pad + 'px">' + esc(node.name) + '</a>';
        }
      }
      return html;
    }
    return renderNodes(currentTree, 0);
  }

  function ensureCurrentPathExpanded() {
    if (!currentFile) return;
    var parts = currentFile.split("/");
    var path = "";
    for (var i = 0; i < parts.length - 1; i++) {
      path = path ? path + "/" + parts[i] : parts[i];
      if (!(path in expandedDirs)) expandedDirs[path] = true;
    }
  }

  function toggleDir(dir) {
    expandedDirs[dir] = !expandedDirs[dir];
    renderSidebar();
  }

  function collectTocNodes(nodes, out) {
    for (var i = 0; i < nodes.length; i++) {
      out.push(nodes[i]);
      if (nodes[i].children && nodes[i].children.length) {
        collectTocNodes(nodes[i].children, out);
      }
    }
  }

  function toggleTocNode(id) {
    tocCollapsed[id] = !tocCollapsed[id];
    renderSidebar();
  }

  function toggleAllToc() {
    var allNodes = [];
    collectTocNodes(currentTocTree, allNodes);
    var allCollapsed = true;
    for (var i = 0; i < allNodes.length; i++) {
      var node = allNodes[i];
      if (node.children && node.children.length && !tocCollapsed[node.id]) {
        allCollapsed = false;
        break;
      }
    }
    var collapse = !allCollapsed;
    for (var i = 0; i < allNodes.length; i++) {
      var node = allNodes[i];
      if (node.children && node.children.length) {
        tocCollapsed[node.id] = collapse;
      }
    }
    renderSidebar();
  }

  function updateCollapseAllLabels() {
    var allNodes = [];
    collectTocNodes(currentTocTree, allNodes);
    var allCollapsed = true;
    for (var i = 0; i < allNodes.length; i++) {
      var node = allNodes[i];
      if (node.children && node.children.length && !tocCollapsed[node.id]) {
        allCollapsed = false;
        break;
      }
    }
    var label = allCollapsed ? "全部展开" : "全部收起";
    var buttons = document.querySelectorAll(".toc-collapse-all");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].textContent = label;
    }
  }

  function renderSidebar() {
    var filesHtml = "";
    if (currentTree.length) {
      filesHtml = '<div class="files-title">文件</div><div class="file-tree">' +
        renderFileTree() + '</div>';
    }
    var tocHtml = "";
    if (currentTocTree.length) {
      tocHtml = '<div class="toc-head"><div class="toc-title">目录</div>' +
        '<button type="button" class="toc-collapse-all">全部收起</button></div><nav>' +
        renderToc(currentTocTree) + '</nav>';
    }
    filesSidebar.innerHTML = filesHtml;
    tocSidebar.innerHTML = tocHtml;
    tocPanel.innerHTML = '<div class="toc-panel-title">文件与目录<button class="toc-close" id="tocClose">&times;</button></div>' +
      filesHtml + tocHtml;
    document.getElementById("tocClose").addEventListener("click", closeTocOverlay);

    var dirButtons = document.querySelectorAll(".files-sidebar .file-dir, .toc-panel .file-dir");
    for (var i = 0; i < dirButtons.length; i++) {
      dirButtons[i].addEventListener("click", function() {
        toggleDir(this.getAttribute("data-dir"));
      });
    }

    var tocToggles = document.querySelectorAll(".toc-sidebar .toc-toggle, .toc-panel .toc-toggle");
    for (var i = 0; i < tocToggles.length; i++) {
      tocToggles[i].addEventListener("click", function() {
        toggleTocNode(this.getAttribute("data-target"));
      });
    }

    var allLinks = document.querySelectorAll(".toc-sidebar .toc-link, .toc-panel .toc-link");
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].addEventListener("click", function(e) {
        e.preventDefault();
        var targetId = this.getAttribute("data-target");
        var target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          closeTocOverlay();
        }
      });
    }

    var collapseButtons = document.querySelectorAll(".toc-collapse-all");
    for (var i = 0; i < collapseButtons.length; i++) {
      collapseButtons[i].addEventListener("click", toggleAllToc);
    }
    updateCollapseAllLabels();

    if (currentTree.length || currentTocTree.length) {
      tocFab.classList.add('visible');
    } else {
      tocFab.classList.remove('visible');
    }
  }

  function openTocOverlay() {
    tocOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeTocOverlay() {
    tocOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  tocFab.addEventListener("click", openTocOverlay);
  tocBackdrop.addEventListener("click", closeTocOverlay);
  themeToggle.addEventListener("click", function() {
    applyTheme(!document.documentElement.classList.contains("dark"));
  });

  searchInput.addEventListener("input", function() {
    clearTimeout(searchTimer);
    var q = this.value.trim();
    if (!q) {
      searchQuery = "";
      searchTimer = setTimeout(function() {
        if (location.hash.slice(1) !== "/") {
          goHome();
        } else {
          loadBlogList();
        }
      }, 150);
      return;
    }
    searchQuery = q;
    searchTimer = setTimeout(function() {
      if (location.hash.slice(1) !== "/") {
        location.hash = "#/";
      } else {
        loadSearch(searchQuery);
      }
    }, 250);
  });

  function updateActiveLink() {
    var sidebarLinks = tocSidebar.querySelectorAll("a.toc-link");
    var panelLinks = tocPanel.querySelectorAll("a.toc-link");
    if (!sidebarLinks.length) return;

    var headings = document.querySelectorAll("#postContent h1[id], #postContent h2[id], #postContent h3[id], #postContent h4[id], #postContent h5[id], #postContent h6[id]");
    if (!headings.length) return;

    var currentId = null;
    var scrollTop = app.getBoundingClientRect().top + 40;

    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top <= scrollTop) {
        currentId = headings[i].id;
      }
    }

    function setActive(links) {
      for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
        if (links[i].getAttribute("data-target") === currentId) {
          links[i].classList.add("active");
        }
      }
    }
    setActive(sidebarLinks);
    setActive(panelLinks);
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  app.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("hashchange", renderRoute);
  window.goHome = goHome;
  renderRoute();
})();
