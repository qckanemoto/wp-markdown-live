$(function() {
	$("#wp-content-editor-container").before("<div style='float:right; margin-right:1em;'><p><a href='http://daringfireball.net/projects/markdown/syntax' target='_blank'>Markdown syntax ?</a></p></div>");

	$("#postdivrich").after("<div id='wp-markdown-live-preview'></div>");

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

	$("textarea#content").on("keyup change", function(e) {
		$("#wp-markdown-live-preview").html("<p>" + marked($(this).val()) + "</p>");
	}).change();
});
