module.exports = Model.createModel({
    init: function(options) {
        options = options || {};
        $.extend(this.attributes, {
            count: options.count || 0,
            name: options.name,
            minCount: options.minCount || 0,
            maxCount: options.maxCount || options.count || 0
        });
    },
    // A.W.: How to make this hidden, or like extension method?
    normalizeCount: function (count) {
        if (count < this.get('minCount')) {
            return this.get('minCount');
        }
        if (count > this.get('maxCount')) {
            return this.get('maxCount');
        }

        return count;
    },
    inc: function(count) {
        this.set(
            'count',
            this.normalizeCount(this.get('count') + (count || 1))
        );
    },
    dec: function(count) {
        this.set(
            'count',
            this.normalizeCount(this.get('count') - (count || 1))
        );
    },
    getCount: function() {
        return this.get('count');
    },
    setCount: function(count) {
        this.set('count', this.normalizeCount(count));
    },
    getName: function() {
        return this.get('name');
    }
});
