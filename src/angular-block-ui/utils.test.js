describe('block-ui-utils', function() {

  var utils, $ = angular.element;

  beforeEach(function() {
    module('blockUI');

    inject(function(blockUIUtils) {
      utils = blockUIUtils;
    });
  });

  describe('buildRegExp', function() {
    it('should create a RegExp object', function() {
      var result = utils.buildRegExp('/\d+/');
      
      expect(result).toBeDefined();
      expect(result.constructor.name).toBe('RegExp');
    });

    it('should parse expression', function() {
      var expression = '\d\d\d';
      var result = utils.buildRegExp('/' + expression + '/');

      expect(result.source).toBe(expression);
    });

    it('should parse global flag', function() {
      
      var result = utils.buildRegExp('/123/g');

      expect(result.global).toBe(true);
      expect(result.ignoreCase).toBe(false);
      expect(result.multiline).toBe(false);
    });

    it('should parse ignoreCase flag', function() {
      
      var result = utils.buildRegExp('/123/i');

      expect(result.global).toBe(false);
      expect(result.ignoreCase).toBe(true);
      expect(result.multiline).toBe(false);
    });

    it('should parse multiline flag', function() {
      
      var result = utils.buildRegExp('/123/m');

      expect(result.global).toBe(false);
      expect(result.ignoreCase).toBe(false);
      expect(result.multiline).toBe(true);
    });
  }); // buildRegExp
  
  describe('forEachFn', function() {

    it('should execute function on each element', function() {

      function Item() {
        this.fn = function() {
          this.executed = true;
        }
      }

      var arr = [ new Item(), new Item(), new Item() ];

      utils.forEachFn(arr, 'fn');

      expect(arr[0].executed).toBe(true);
      expect(arr[1].executed).toBe(true);
      expect(arr[2].executed).toBe(true);
    });

    it('should pass arguments to each function call', function() {

      function Item() {
        this.fn = function(v1, v2, v3) {
          this.v1 = v1;
          this.v2 = v2;
          this.v3 = v3;
        }
      }

      var arr = [ new Item() ];
      var args = [ 1, 2, 3 ];
      utils.forEachFn(arr, 'fn', args);

      expect(arr[0].v1).toBe(1);
      expect(arr[0].v2).toBe(2);
      expect(arr[0].v3).toBe(3);
      
    });

    it('should be able to be hook function', function() {

      function Item() {
        this.fn = function(v1, v2, v3) {
          this.v1 = v1;
          this.v2 = v2;
          this.v3 = v3;
        }
      }

      var arr = [ new Item() ];

      utils.forEachFnHook(arr, 'fn');
      
      arr.fn(1,2,3);

      expect(arr[0].v1).toBe(1);
      expect(arr[0].v2).toBe(2);
      expect(arr[0].v3).toBe(3);
      
    });

  });

  describe('findElement', function() {

    it('should return null if no match is found', function() {

      var $element = $('<div></div>');

      var result = utils.findElement($element, 'whatever');

      expect(result).toBe(null);

    });

    it('should return the root match', function() {

      var $element = $('<div class="target-class"></div>');

      var result = utils.findElement($element, 'target-class');

      expect(result).not.toBe(null);
      expect(result.hasClass('target-class')).toBe(true);
    });

    it('should return the child match', function() {

      var $element = $('<div><div class="target-class"></div></div>');

      var result = utils.findElement($element, 'target-class');

      expect(result).not.toBe(null);
      expect(result.hasClass('target-class')).toBe(true);
    });

    it('should return the child > child match', function() {

      var $element = $('<div><div><div class="target-class"></div></div></div>');

      var result = utils.findElement($element, 'target-class');

      expect(result).not.toBe(null);
      expect(result.hasClass('target-class')).toBe(true);

    });

  });
});