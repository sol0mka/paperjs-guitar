// Generated by CoffeeScript 1.6.2
var String, Strings, h, mouseDown, mouseDrag, mouseMove, onFrame, onMouseDown, onMouseDrag, onMouseMove, onMouseUp, strings;

Path.prototype.setWidth = function(width) {
  this.segments[3].point.x = this.segments[0].point.x + width;
  return this.segments[2].point.x = this.segments[1].point.x + width;
};

Path.prototype.setHeight = function(height) {
  this.segments[1].point.y = this.segments[0].point.y + height;
  return this.segments[2].point.y = this.segments[3].point.y + height;
};

Path.prototype.reset = function() {
  this.setWidth(0);
  this.setHeight(0);
  return this.smooth();
};

h = {
  getRand: function(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
  }
};

view.setViewSize($(window).outerWidth(), $(window).outerHeight());

mouseDown = null;

mouseMove = null;

mouseDrag = null;

String = (function() {
  function String(o) {
    var _base, _ref;

    this.o = o;
    if ((_ref = (_base = this.o).stringsOffset) == null) {
      _base.stringsOffset = this.o.width * 15;
    }
    this.touched = false;
    this.anima = false;
    this.colors = ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900", "#C02942", "#542437", "#53777A", "#ECD078", "#FE4365"];
    this.defaultColor = "#333";
    this.makeBase();
  }

  String.prototype.makeBase = function() {
    this.base = new Path;
    this.base.add(this.o.start);
    this.base.add([this.o.start.x, this.o.start.y + this.o.length]);
    this.base.strokeColor = this.defaultColor;
    this.base.strokeWidth = this.o.width;
    return console.log(this.base);
  };

  String.prototype.change = function(e) {
    var point;

    if (e.delta.x > 0) {
      if (((e.point + e.delta).x >= this.o.offset) && this.o.offset > mouseDown.x) {
        this.touched = true;
      }
    }
    if (e.delta.x < 0) {
      if (((e.point - e.delta).x <= this.o.offset) && this.o.offset < mouseDown.x) {
        this.touched = true;
      }
    }
    point = e.point;
    if (!this.touched) {
      return;
    }
    if ((point.x > (this.o.offset + this.o.stringsOffset)) || (point.x < (this.o.offset - this.o.stringsOffset))) {
      return;
    }
    if (this.anima) {
      return;
    }
    this.base.segments[0].handleOut.y = point.y;
    return this.base.segments[0].handleOut.x = point.x - this.o.offset;
  };

  String.prototype.animate = function() {
    this.touched = false;
    if (this.anima) {
      return;
    }
    if (this.base.segments[0].handleOut.x === 0) {
      return;
    }
    this.soundX = parseInt(Math.abs(this.base.segments[0].handleOut.x));
    this.soundY = parseInt(Math.abs(this.base.segments[0].handleOut.y));
    this.soundY = this.soundY / (view.viewSize.height + (2 * this.o.width));
    this.animateQuake();
    return this.animateColor();
  };

  String.prototype.animateColor = function() {
    var from, it, to, _ref;

    if ((_ref = this.twColor) != null) {
      _ref.stop();
    }
    this.base.strokeColor = this.colors[this.index % this.colors.length];
    this.base.strokeColor.saturation = this.soundY * 4;
    from = {
      t: 0
    };
    to = {
      t: 1
    };
    this.twColor = new TWEEN.Tween(from).to(to, this.soundX * 6);
    it = this;
    this.twColor.onUpdate(function() {
      it.base.strokeColor.brightness -= this.t / 8;
      if (it.base.strokeColor.brightness <= 0.1) {
        return it.base.strokeColor = it.defaultColor;
      }
    });
    return this.twColor.start();
  };

  String.prototype.animateQuake = function() {
    var from, it, to,
      _this = this;

    this.anima = true;
    from = {
      x: this.base.segments[0].handleOut.x,
      y: this.base.segments[0].handleOut.y,
      c: 1
    };
    to = {
      x: 0,
      y: 0,
      c: 0
    };
    this.tw = new TWEEN.Tween(from).to(to, 1000);
    this.tw.easing(function(t) {
      var b;

      b = Math.exp(-t * 10) * Math.cos(Math.PI * 2 * t * 10);
      if (t >= 1) {
        return 1;
      }
      return 1 - b;
    });
    it = this;
    this.tw.onUpdate(function() {
      it.base.segments[0].handleOut.x = this.x;
      return it.base.segments[0].handleOut.y = this.y;
    });
    this.tw.onComplete(function() {
      return _this.teardown();
    });
    return this.tw.start();
  };

  String.prototype.teardown = function() {
    this.base.segments[0].handleOut.x = 0;
    this.base.segments[0].handleOut.y = 0;
    this.anima = false;
    this.touched = false;
    return this.base.strokeColor = this.defaultColor;
  };

  return String;

})();

Strings = (function() {
  function Strings(o) {
    this.initialOffset = 100;
    this.strings = [];
    this.stringWidth = 10;
    this.lenCoef = 0;
    this.guitarShape = [
      {
        start: new Point([this.initialOffset, 656]),
        length: 22 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 1 * this.stringWidth * 1.5, 613]),
        length: 38 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 2 * this.stringWidth * 1.5, 570]),
        length: 60 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 3 * this.stringWidth * 1.5, 518]),
        length: 90 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 4 * this.stringWidth * 1.5, 470]),
        length: 118 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 5 * this.stringWidth * 1.5, 417]),
        length: 153 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 6 * this.stringWidth * 1.5, 367]),
        length: 188 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 7 * this.stringWidth * 1.5, 52]),
        length: 486
      }, {
        start: new Point([this.initialOffset + 8 * this.stringWidth * 1.5, 34]),
        length: 496 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 9 * this.stringWidth * 1.5, 332]),
        length: 190 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 10 * this.stringWidth * 1.5, 348]),
        length: 177 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 11 * this.stringWidth * 1.5, 372]),
        length: 156 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 12 * this.stringWidth * 1.5, 396]),
        length: 140 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 13 * this.stringWidth * 1.5, 432]),
        length: 110 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 14 * this.stringWidth * 1.5, 472]),
        length: 84 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 15 * this.stringWidth * 1.5, 510]),
        length: 60 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 16 * this.stringWidth * 1.5, 534]),
        length: 42 + this.lenCoef
      }, {
        start: new Point([this.initialOffset + 17 * this.stringWidth * 1.5, 570]),
        length: 22 + this.lenCoef
      }
    ];
    this.makeStrings();
    this.makebase();
  }

  Strings.prototype.makebase = function() {
    this.base = new Path.Circle([-100, -100], this.stringWidth);
    this.base.fillColor = '#FFF';
    return this.base.opacity = .85;
  };

  Strings.prototype.mouseMove = function(e) {
    return this.base.position = e.point;
  };

  Strings.prototype.makeStrings = function(cnt) {
    var i, string, _i, _ref, _results;

    if (cnt == null) {
      cnt = 15;
    }
    _results = [];
    for (i = _i = 0, _ref = this.guitarShape.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      string = new String({
        width: this.stringWidth,
        start: this.guitarShape[i].start,
        length: this.guitarShape[i].length
      });
      string.index = i;
      _results.push(this.strings.push(string));
    }
    return _results;
  };

  Strings.prototype.makeQuake = function() {
    var i, string, _i, _len, _ref, _results;

    _ref = this.strings;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      string = _ref[i];
      _results.push(string.animate());
    }
    return _results;
  };

  Strings.prototype.changeStrings = function(point) {
    var i, string, _i, _len, _ref, _results;

    _ref = this.strings;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      string = _ref[i];
      _results.push(string.change(point));
    }
    return _results;
  };

  Strings.prototype.teardown = function() {
    var i, string, _i, _len, _ref, _results;

    TWEEN.removeAll();
    _ref = this.strings;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      string = _ref[i];
      _results.push(string.teardown());
    }
    return _results;
  };

  return Strings;

})();

strings = new Strings;

onFrame = function(e) {
  return TWEEN.update();
};

onMouseDrag = function(e) {
  strings.changeStrings(e);
  strings.mouseMove(e);
  return mouseDrag = e.point;
};

onMouseDown = function(e) {
  strings.teardown();
  return mouseDown = e.point;
};

onMouseUp = function(e) {
  return strings.makeQuake();
};

onMouseMove = function(e) {
  mouseMove = e.point;
  return strings.mouseMove(e);
};
