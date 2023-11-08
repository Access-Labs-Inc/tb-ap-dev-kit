<?php

/**
 * Add Access Protocol fields to the post editor
 * This will only add fields if ACF is installed, it does not affect the frontend of the site at all by itself.
 */

if(!is_admin())
	return;

function add_access_protocol_fields() {
	if (!function_exists('acf_add_local_field_group')) {
		error_log('ACF not installed: https://www.advancedcustomfields.com/');
		return;
	}
	acf_add_local_field_group([
		'key' => 'group_ap_post_is_access',
		'title' => 'Access Protocol',
		'fields' => [
			[
				'key' => 'field_ap-post-is-access',
				'label' => 'Access Protocol State',
				'name' => 'ap-post-is-access',
				'type' => 'true_false',
				'default_value' => 0,
				'message' => 'Is Access',
				'instructions' => "Set a flag in WordPress to use Access Protocol for this post. Your WordPress frontend must be configured to use Access Protocol.",
			]
		],
		'location' => [
			[
				[
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'post',
				],
			]
		],
		'menu_order' => 0,
		'position' => 'side',
		'style' => 'default closed',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
	]);

	add_filter('manage_post_posts_columns', [$this, 'setPostListColumns'], 100);
	add_filter('manage_post_posts_custom_column', [$this, 'setPostListColumnValues'], 10, 2);
}

function setPostListColumns($columns) {
	$columns['is_access'] = __('<span class="yoast-tooltip yoast-tooltip-n yoast-tooltip-alt" data-label="Is Access"><span class="">🔐<span class="screen-reader-text">Is Access</span></span></span>');
    return $columns;
}

function setPostListColumnValues($column, $post_id)
{
	if (!function_exists('get_field')) {
		error_log('ACF not installed: https://www.advancedcustomfields.com/');
		return;
	}

	if ('is_access' === $column) {
		echo get_field('ap-post-is-access', $post_id, false) ? '✅' : '−';
	}
}

add_action('acf/init', 'add_access_protocol_fields');

