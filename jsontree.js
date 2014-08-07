function Tree(el) {
  var $el = $(el);
  $el.addClass('tree-cont');
  $el.on('click', '.tree-obj-caption', function(e) {
    $(e.currentTarget).parent().toggleClass('tree-expand');
  });

  var toRow = function(obj) {
    if (typeof(obj) === 'object') {
      if ($.isArray(obj)) {
        return '[' + obj.map(function(e) { return toRow(e); }).join(', ') + ']';
      }
      else {
        return '{' + $.map(obj, function(val, key) { return key + ': ' + toRow(val); }).join(', ') + '}';
      }
    }
    else {
      return obj;
    }
  }
  
  var toTree = function(name, obj, id) {
    if (typeof(obj) === 'object') {
      id += '_' + name;
      var res = '<div id="' + id + '">' +
        '<div class="tree-obj-caption">' + 
        '<span class="tree-closed"><span class="tree-bullet"><span>\u25B9</span></span>' +
        name + ': ' + toRow(obj) + '</span>' +
        '<span class="tree-opened"><span class="tree-bullet"><span>\u25BF</span></span>' + name + '</span></div>' +
        '<div class="tree-children tree-opened">';

      $.each(obj, function(key, val) {
        res += '<div class="tree-child">' + toTree(key, val, id) + '</div>';
      });
      res += '</div></div>';

      return res;
    }
    
    return '<div class="tree-simple">' + name + ': ' + obj + '</div>';
  }

  this.set = function(obj) {
    var expanded = $el.find('.tree-expand').toArray().map(function(el) { return el.getAttribute('id'); });
    $el.html(toTree('root', obj, ''));
    $(expanded.map(function(e) { return '#' + e }).join(', ')).addClass('tree-expand');
  }
}
