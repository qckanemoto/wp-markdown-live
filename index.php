<?php
/*
Plugin Name: WP Markdown Live
Plugin URI: http://github.com/qckanemoto/wp-markdown-live
Description:
Version: 1.0
Author: Takashi Kanemoto
Author URI: http://github.com/qckanemoto
License: MIT
*/

$md = new WpMarkdownLive();

class WpMarkdownLive
{
	function __construct()
	{
		register_deactivation_hook(__FILE__, array(&$this, 'deactivate'));

		add_action('plugins_loaded', array(&$this, 'init'));
		add_action('user_edit_form_tag', array(&$this, 'hide_rich_editing_setting'));
		add_filter('quicktags_settings', array(&$this, 'empty_quicktags'), 10, 1);
		add_action('admin_enqueue_scripts', array(&$this, 'admin_enqueue_scripts'));
		add_action('admin_print_footer_scripts', array(&$this, 'admin_print_footer_scripts'));

		remove_filter('the_content', 'wpautop');
		remove_filter('the_excerpt', 'wpautop');
		remove_filter('the_content', 'wptexturize');
		remove_filter('the_excerpt', 'wptexturize');
		add_filter('the_content', array(&$this, 'markdown'));
		add_filter('the_excerpt', array(&$this, 'markdown'));
	}

	function deactivate()
	{
		$this->enable_rich_editing();
	}

	function enable_rich_editing()
	{
		update_user_option(get_current_user_id(), 'rich_editing', 'true', true);
	}

	function disable_rich_editing()
	{
		update_user_option(get_current_user_id(), 'rich_editing', 'false', true);
	}

	function init()
	{
		$this->disable_rich_editing();

		if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
			require_once dirname(__FILE__) . '/vendor/autoload.php';
		}
	}

	function hide_rich_editing_setting()
	{
		global $wp_rich_edit_exists;
		$wp_rich_edit_exists = false;
	}

	function empty_quicktags($qtInit)
	{
		$qtInit['buttons'] = ' ';
		return $qtInit;
	}

	function admin_enqueue_scripts()
	{
		if (!wp_script_is('jquery')) {
			wp_enqueue_script('wp-markdown-live-js-jquery', plugin_dir_url(__FILE__) . 'js/jquery.min.js');
		}
		wp_enqueue_script('wp-markdown-live-js-marked', plugin_dir_url(__FILE__) . 'js/marked.js');
		wp_enqueue_script('wp-markdown-live-js-behave', plugin_dir_url(__FILE__) . 'js/behave.js');
		wp_enqueue_script('wp-markdown-live-js-script', plugin_dir_url(__FILE__) . 'js/script.js');
		wp_enqueue_style('wp-markdown-live-css-style', plugin_dir_url(__FILE__) . 'css/style.css');
	}

	function admin_print_footer_scripts()
	{
		if (wp_script_is('quicktags')) {
			?>
			<script type="text/javascript">
				QTags.addButton('md_h1', 'H1', '#', ' ', '1');
				QTags.addButton('md_h2', 'H2', '##', ' ', '2');
				QTags.addButton('md_h3', 'H3', '###', ' ', '3');
				QTags.addButton('md_bold', 'b', '**', '**', 'b');
				QTags.addButton('md_italic', 'i', '*', '*', 'i');
				QTags.addButton('md_link', 'link', '[', '](http://)', 'a');
				QTags.addButton('md_quote', 'quote', '> ', ' ', 'q');
				QTags.addButton('md_image', 'img', '![Alt Text](http://)', '', 'm');
			</script>
			<?php
		}
	}

	function markdown($content)
	{
		return MarkdownExtended($content);
	}
}
