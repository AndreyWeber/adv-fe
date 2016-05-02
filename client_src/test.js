$(function () {
    "use strict";

    var users = Data.getUsers();

    function renderJsonPrintTemplate (template) {
        if (!template) {
            return;
        }

        $('.json-container__json').html(template({
            jsonObj: users
        }));
    }

    function renderStripedTableTemplate (template) {
        if (!template) {
            return;
        }

        $('.striped-table-container__table').html(template({
            users: users
        }));
    }
    
    function renderJsonHelper (jsonObj) {
        if (!jsonObj){
            return new Handlebars.SafeString('<i>&lt;Empty JSON object&gt;</i>');
        }

        var jsonString =
            Handlebars.Utils.escapeExpression(JSON.stringify(jsonObj, null, '\t'));
        return new Handlebars.SafeString('<pre>' + jsonString + '</pre>');
    }

    function renderStripedTableHelper (context, options) {
        if (!context) {
            return new Handlebars.SafeString('<div class="striped-table__odd-row"><i>&lt;Empty striped table&gt;</i></div>')
        }

        var result = context.map(function (item, idx) {
            var rowClass = (idx + 1) % 2
                ? options.hash.oddRowClass
                : options.hash.evenRowClass;

            return '<div class="' + rowClass + '">' + options.fn(item).trim() + '</div>';
        }).join("\n");

        return new Handlebars.SafeString(result);
    }

    $(document).ready(function () {
        var jsonPrintTemplateRaw = $('#json-print-template').html();
        var stripedTableTemplateRaw = $("#striped-table-template").html();
        var jsonPrintTemplate = Handlebars.compile(jsonPrintTemplateRaw);
        var stripedTableTemplate = Handlebars.compile(stripedTableTemplateRaw);

        Handlebars.registerHelper({
            json: renderJsonHelper,
            stripedTable: renderStripedTableHelper
        });

        renderJsonPrintTemplate(jsonPrintTemplate);
        renderStripedTableTemplate(stripedTableTemplate)
    });
});
