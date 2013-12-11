$(function() {
    // insert syntax link.
    setTimeout(function() {
        $("#ed_toolbar").append("<div style='float:right; margin-top:-0.6em;'><p><a href='http://daringfireball.net/projects/markdown/syntax' target='_blank'>Markdown syntax ?</a></p></div>");
    }, 1000);

    // resize textarea.
    var half = $("#postdivrich").width() / 2 - 5;
    $("#postdivrich").width(half).css("float", "left");

    // insert preview area.
    var $preview = $("<div id='wp-markdown-live-preview'></div>").width(half).css("float", "right").css("margin-top", $("#wp-content-editor-tools").height());
    $("#postdivrich").after($preview);

    // customize textarea.
    new Behave({
        textarea: document.getElementById('content'),
        replaceTab: true,
        softTabs: true,
        tabSize: 4,
        autoOpen: true,
        overwrite: true,
        autoStrip: true,
        autoIndent: true,
        fence: false
    });

    // handle event on textarea.
    $("textarea#content").on("keyup change", function(e) {
        $("#wp-markdown-live-preview").html("<p>" + marked($(this).val()) + "</p>");
    }).change();
});
