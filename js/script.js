$(function() {
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

    // insert preview button after all.
    setTimeout(function() {
        var $button = $("<button type='button' id='wp-markdown-live-button' class='button ed_button' style='float:right; margin-top:2px;'>preview</button>");
        var $tooltip = $("<p class='wp-markdown-live-tooltip'>Or press \"Ctlr+L\"</p>").hide();
        $("#ed_toolbar").append($button);
        $("#ed_toolbar").append($tooltip);

        // handle event on textarea.
        $("#wp-markdown-live-button")
            .on("click", function(e) {
                var content = $("textarea#content").val();
                $.ajax({
                    type        : "POST",
                    dataType    : "text",
                    url         : ajaxurl,
                    data        : "content=" + encodeURIComponent(content) + "&action=markdown",
                    success     : function(data) {
                        // show scrollbar forcely.
                        var height = $("body").height();
                        $("body").height(100000);

                        // resize textarea and preview area.
                        var half = $("#post-body-content").outerWidth() / 2 - 5;
                        $("#postdivrich").outerWidth(half).css("float", "left");
                        $("#wp-markdown-live-preview").outerWidth(half);

                        // render preview area.
                        $("#wp-markdown-live-preview").html(data);

                        // resize textarea.
                        $("textarea#content").height($("#wp-markdown-live-preview").height());

                        // restore body height.
                        $("body").height(height);
                    },
                    error       : function(xmlHttpRequest, textStatus, errorThrown) {
                        // do nothing for now.
                    }
                });
            })
            .on("mouseover", function() {
                $(this).next(".wp-markdown-live-tooltip").fadeIn(100);
            })
            .on("mouseout", function() {
                $(this).next(".wp-markdown-live-tooltip").fadeOut(100);
            })
            .click();
    }, 1000);

    // observe keyboard shortcut.
    $("*")
        .on("keydown", function(e) {
            switch (e.keyCode) {
                case 17:    // Ctrl
                    $("#wp-markdown-live-preview").addClass("down-ctrl");
                    if ($("#wp-markdown-live-preview").hasClass("down-l")) {
                        $("#wp-markdown-live-button").click();
                    }
                    break;
                case 76:    // l
                    $("#wp-markdown-live-preview").addClass("down-l");
                    if ($("#wp-markdown-live-preview").hasClass("down-ctrl")) {
                        $("#wp-markdown-live-button").click();
                    }
                    break;
                default:
                    break;
            }
        })
        .on("keyup", function(e) {
            switch (e.keyCode) {
                case 17:    // Ctrl
                    $("#wp-markdown-live-preview").removeClass("down-ctrl");
                    break;
                case 76:    // l
                    $("#wp-markdown-live-preview").removeClass("down-l");
                    break;
                default:
                    break;
            }
        });
});
