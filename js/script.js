$(function() {
    // insert syntax link.
    setTimeout(function() {
        $("#ed_toolbar").append("<div style='float:right; margin-top:-0.6em;'><p><a href='http://daringfireball.net/projects/markdown/syntax' target='_blank'>Markdown syntax ?</a></p></div>");
    }, 1000);

    // insert preview area.
    var $preview = $("<div id='wp-markdown-live-preview'></div>").css("float", "right").css("margin-top", $("#wp-content-editor-tools").height());
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

        // show scrollbar forcely.
        var height = $("body").height();
        $("body").height(100000);

        // resize textarea and preview area.
        var half = $("#post-body-content").outerWidth() / 2 - 5;
        $("#postdivrich").outerWidth(half).css("float", "left");
        $("#wp-markdown-live-preview").outerWidth(half);

        // render preview area.
        $("#wp-markdown-live-preview").html(marked($(this).val()));

        // restore body height.
        $("body").height(height);
    }).change();
});
