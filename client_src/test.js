$(function () {
    "use strict";

    function renderJsonPrintTemplate (template) {
        if (!template) {
            return;
        }

        var context = Data.getUsers();
        $('.json-container__json').html(template({
            jsonObj: context
        }));
    }

    function renderJsonHelper (jsonObj) {
        if (!jsonObj){
            return new Handlebars.SafeString('&lt;Empty JSON object&gt;');
        }

        var jsonString = JSON.stringify(jsonObj, null, '\t');
        return new Handlebars.SafeString('<pre>' + jsonString + '</pre>');
    }

    $(document).ready(function () {
        var jsonPrintTemplateRaw = $('#json-print-template').html();
        var jsonPrintTemplate = Handlebars.compile(jsonPrintTemplateRaw);

        Handlebars.registerHelper('json', renderJsonHelper);

        renderJsonPrintTemplate(jsonPrintTemplate);
    });
});
