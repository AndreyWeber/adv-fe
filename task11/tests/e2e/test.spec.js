describe('page ', function () {

    var baseGodHate;
    var resCoolnesses = {};

    beforeAll(function () {
        baseGodHate = 50;

        resCoolnesses.goldCoolness = 6;
        resCoolnesses.copperCoolness = 2;
        resCoolnesses.someCoolness = 1;
    });

    beforeEach(function () {
        browser.url('/');
    });

    it('should check title', function () {
        var title = browser.getTitle();
        expect(title).toBe('test title');
    });

    it('should inc', function () {
        var resBefore = browser.getText('.user-wealth__resources .resource__val')[0];
        var inc = browser.click('.gift-tunner__controls .tune-controls__inc')[0];

        var bar = browser.getText('.gift-tunner__bar .bar')[0];

        expect(resBefore).toBe('20');
        expect(bar.length).toBe(1);
        var resAfter = browser.getText('.user-wealth__resources .resource__val')[0];
        expect(resAfter).toBe('19');
    });

    function testResource (resNum, resCoolness) {
        var godHateSelector = '.god-hate-indicator__bar .bar';
        var nthIncTuner = '.god-gift-form__tunners > div:nth-child(' + resNum + ') .tune-controls__inc';
        var nthDecTuner = '.god-gift-form__tunners > div:nth-child(' + resNum + ') .tune-controls__dec';

        var hateBefore = browser.getText(godHateSelector);
        expect(hateBefore.length).toBe(baseGodHate);

        browser.click(nthIncTuner);

        var hateAfter = browser.getText(godHateSelector);
        expect(hateAfter.length).toBe(baseGodHate - resCoolness);

        browser.click(nthDecTuner);

        hateAfter = browser.getText(godHateSelector);
        expect(hateAfter.length).toBe(baseGodHate);
    }

    it('Gold should change God hate', function () {
        testResource(1, resCoolnesses.goldCoolness);
    });

    it('Copper should change God hate', function () {
        testResource(2, resCoolnesses.copperCoolness);
    });

    it('Some should change God hate', function () {
        testResource(3, resCoolnesses.someCoolness);
    });
});
