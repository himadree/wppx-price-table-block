<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
function wppx_price_table_block_cgb_block_assets() {

	// Register block editor script for backend.
	wp_register_script(
		'wppx_price_table_block-cgb-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'wppx_price_table_block-cgb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'wppx_price_table_block-cgb-block-js',
		'cgbGlobal',
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 */
	register_block_type(
		'cgb/block-wppx-price-table-block', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'wppx_price_table_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'wppx_price_table_block-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'wppx_price_table_block-cgb-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'wppx_price_table_block_cgb_block_assets' );

function wppx_pricing_block_assets() {
	// Styles.
	wp_enqueue_style(
		'wppx-pricing-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' )
	);

}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'wppx_pricing_block_assets',10000);

/**
 * Create custome category
 */
function wppx_custom_block_category( $category, $post ){
	// if( 'page' !== get_post_type($post) ){
	// 	return $category;
	// }
	return array_merge( $category, array(
		array(
			'slug' => 'wppx_block_list',
			'title' => __( 'WPPX Block', 'wppx-price-table-block' ),
			'icon'  => 'flag',
		)
		));
}
add_filter( 'block_categories', 'wppx_custom_block_category', 10, 2 );