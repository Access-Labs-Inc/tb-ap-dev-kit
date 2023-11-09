<?php
/*
Plugin Name: Access Protocol
Plugin URI: http://github.com/TheBlockCrypto/Wordpress
Description: Integrates Access Protocol into Wordpress
Version: 1.0
Author: Access Protocol Dev Team
Author URI: https://www.accessprotocol.co/
License: MIT
Requires: Advanced Custom Fields Pro https://www.advancedcustomfields.com/
 */

if ( ! defined( 'ACCESS_PROTOCOL_DIR' ) ) {
  define( 'ACCESS_PROTOCOL_DIR', dirname( __FILE__ ) );
}

require_once ACCESS_PROTOCOL_DIR . '/src/admin.php';