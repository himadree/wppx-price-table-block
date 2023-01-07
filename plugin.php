<?php
/**
 * Plugin Name: WPPX Price Table Block
 * Plugin URI: https://wppixels.com/gb-price-table-block/
 * Description: Instantly create beautiful pricing table for Gutenberg editor.
 * Author: Himadree
 * Author URI: https://wppixels.com/
 * Version: 1.0.0
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: wppx-price-table-block
 *
 * @package wppx-price-table-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
