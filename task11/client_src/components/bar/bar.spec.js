var Bar = require('./bar.js');

describe('bar', function () {
    var barProgress = 5;

    beforeEach(function () {
        var options = {
            model: {
                subscribe: function () {},
                getCount: function () { return barProgress; }
            }
        };
        this.bar = new Bar(options);
    });

    describe('elem', function () {
        it('should be defined', function () {
            expect(this.bar.elem).toBeDefined();
        });

        it('should contain empty div', function () {
            expect(this.bar.elem[0].outerHTML).toEqual('<div></div>');
        });
    });

    describe('getCount', function () {
        beforeEach(function () {
            spyOn(this.bar, 'getCount').and.callThrough();
        });

        it('should be defined', function () {
            expect(this.bar.getCount).toBeDefined();
        });

        it('should return predefined progress value = ' + barProgress, function () {
            var count = this.bar.getCount();
            expect(this.bar.getCount).toHaveBeenCalled(); // This is not required, just to practice
            expect(count).toEqual(barProgress);
        });
    });

    describe('render', function () {
        beforeEach(function() {
            spyOn(this.bar.elem, 'html');
        });

        it('should be defined', function () {
            expect(this.bar.render).toBeDefined();
        });

        it('should call elem.html', function () {
            this.bar.render();
            expect(this.bar.elem.html).toHaveBeenCalled();
        });

        it('should return this bar', function () {
            var bar = this.bar.render();
            expect(bar).not.toBeNull();
            expect(bar).toBeDefined();
            expect(bar).toEqual(jasmine.any(Object));
            expect(bar).toBe(this.bar);
        });
    });
});
