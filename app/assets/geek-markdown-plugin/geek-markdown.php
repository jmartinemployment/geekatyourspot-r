<?php
/**
 * Plugin Name: Geek Markdown
 * Plugin URI: https://geekatyourspot.com
 * Description: Simple markdown support for WordPress posts without Gutenberg dependency
 * Version: 1.0.2
 * Author: Geek @ Your Spot
 * Author URI: https://geekatyourspot.com
 * License: GPL-2.0+
 * Text Domain: geek-markdown
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include Parsedown library
require_once plugin_dir_path(__FILE__) . 'includes/Parsedown.php';

class GeekMarkdown {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('add_meta_boxes', array($this, 'add_markdown_meta_box'));
        add_action('save_post', array($this, 'save_markdown_content'), 10, 2);
        add_filter('the_content', array($this, 'render_markdown_content'));
        add_shortcode('geek_markdown', array($this, 'markdown_shortcode'));
        add_action('admin_notices', array($this, 'admin_notice'));
    }
    
    public function admin_notice() {
        $screen = get_current_screen();
        if ($screen && in_array($screen->post_type, array('post', 'page'))) {
            global $post;
            if ($post) {
                $saved_content = get_post_meta($post->ID, '_geek_markdown_content', true);
                $use_markdown = get_post_meta($post->ID, '_geek_use_markdown', true);
                
                if ($use_markdown && !empty($saved_content)) {
                    echo '<div class="notice notice-success is-dismissible">';
                    echo '<p><strong>✅ Geek Markdown:</strong> Content saved successfully! (' . strlen($saved_content) . ' characters)</p>';
                    echo '</div>';
                } elseif ($use_markdown && empty($saved_content)) {
                    echo '<div class="notice notice-warning is-dismissible">';
                    echo '<p><strong>⚠️ Geek Markdown:</strong> Checkbox is enabled but no content saved yet.</p>';
                    echo '</div>';
                }
            }
        }
    }
    
    public function add_markdown_meta_box() {
        $post_types = array('post', 'page');
        
        foreach ($post_types as $post_type) {
            add_meta_box(
                'geek_markdown_box',
                '✍️ Markdown Content (Geek Markdown Plugin)',
                array($this, 'render_markdown_meta_box'),
                $post_type,
                'normal',
                'high'
            );
        }
    }
    
    public function render_markdown_meta_box($post) {
        wp_nonce_field('geek_markdown_save', 'geek_markdown_nonce');
        
        $markdown_content = get_post_meta($post->ID, '_geek_markdown_content', true);
        $use_markdown = get_post_meta($post->ID, '_geek_use_markdown', true);
        
        ?>
        <div class="geek-markdown-wrapper" style="background: #f0f8ff; padding: 20px; border: 2px solid #0073aa; border-radius: 5px;">
            
            <div style="background: #0073aa; color: white; padding: 10px; margin: -20px -20px 20px -20px; border-radius: 3px 3px 0 0;">
                <h3 style="margin: 0; color: white;">🚀 Geek Markdown Editor</h3>
                <?php if (!empty($markdown_content)): ?>
                    <p style="margin: 5px 0 0 0; font-size: 12px;">Saved: <?php echo strlen($markdown_content); ?> characters</p>
                <?php endif; ?>
            </div>
            
            <label style="display: block; font-size: 16px; font-weight: bold; margin-bottom: 15px;">
                <input type="checkbox" 
                       name="geek_use_markdown" 
                       id="geek_use_markdown"
                       value="1" 
                       <?php checked($use_markdown, '1'); ?>
                       style="width: 20px; height: 20px; vertical-align: middle;">
                <span style="vertical-align: middle; margin-left: 10px;">✅ Use Markdown for this post</span>
            </label>
            
            <p class="description" style="margin-top: 10px; padding: 10px; background: #fffbcc; border-left: 4px solid #ffb900;">
                <strong>How it works:</strong> Check the box above, paste your markdown below, click "Publish" or "Update". 
                The regular WordPress editor content will be ignored when markdown is enabled.
            </p>
            
            <textarea 
                name="geek_markdown_content" 
                id="geek_markdown_content" 
                rows="25" 
                style="width: 100%; font-family: 'Courier New', monospace; margin-top: 15px; font-size: 14px; padding: 15px; border: 2px solid #0073aa;"
                placeholder="# Your Markdown Content Here&#10;&#10;## Section 1&#10;&#10;Write your post in markdown format...&#10;&#10;**Bold text** and *italic text* work great!"><?php echo esc_textarea($markdown_content); ?></textarea>
            
            <div style="margin-top: 15px; background: white; padding: 15px; border: 1px solid #ddd; border-radius: 3px;">
                <strong>�� Markdown Quick Reference:</strong>
                <table style="margin-top: 10px; width: 100%;">
                    <tr>
                        <td style="padding: 5px;"><code># Heading 1</code></td>
                        <td>→ H1 (Main title)</td>
                        <td style="padding: 5px;"><code>**bold**</code></td>
                        <td>→ <strong>bold</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 5px;"><code>## Heading 2</code></td>
                        <td>→ H2 (Section)</td>
                        <td style="padding: 5px;"><code>*italic*</code></td>
                        <td>→ <em>italic</em></td>
                    </tr>
                    <tr>
                        <td style="padding: 5px;"><code>### Heading 3</code></td>
                        <td>→ H3 (Subsection)</td>
                        <td style="padding: 5px;"><code>[text](url)</code></td>
                        <td>→ Link</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px;"><code>- item</code></td>
                        <td>→ Bullet</td>
                        <td style="padding: 5px;"><code>1. item</code></td>
                        <td>→ Numbered</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <script>
        // Debug: Log when content changes
        document.getElementById('geek_markdown_content').addEventListener('input', function() {
            console.log('Markdown content length:', this.value.length);
        });
        </script>
        <?php
    }
    
    public function save_markdown_content($post_id, $post) {
        // Debug logging
        error_log('Geek Markdown: save_post fired for post ' . $post_id);
        
        // Check if our nonce is set
        if (!isset($_POST['geek_markdown_nonce'])) {
            error_log('Geek Markdown: No nonce found');
            return;
        }
        
        // Verify nonce
        if (!wp_verify_nonce($_POST['geek_markdown_nonce'], 'geek_markdown_save')) {
            error_log('Geek Markdown: Nonce verification failed');
            return;
        }
        
        // Check autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            error_log('Geek Markdown: Skipping autosave');
            return;
        }
        
        // Check post type
        if (!in_array($post->post_type, array('post', 'page'))) {
            error_log('Geek Markdown: Wrong post type: ' . $post->post_type);
            return;
        }
        
        // Check permissions
        if (!current_user_can('edit_post', $post_id)) {
            error_log('Geek Markdown: User lacks permission');
            return;
        }
        
        // Save checkbox state
        $use_markdown = isset($_POST['geek_use_markdown']) ? '1' : '0';
        update_post_meta($post_id, '_geek_use_markdown', $use_markdown);
        error_log('Geek Markdown: Checkbox saved: ' . $use_markdown);
        
        // Save markdown content - USE MINIMAL SANITIZATION
        if (isset($_POST['geek_markdown_content'])) {
            // Just remove null bytes and trim - preserve markdown formatting
            $markdown_content = str_replace("\0", '', $_POST['geek_markdown_content']);
            $markdown_content = trim($markdown_content);
            
            update_post_meta($post_id, '_geek_markdown_content', $markdown_content);
            error_log('Geek Markdown: Content saved - ' . strlen($markdown_content) . ' characters');
        } else {
            error_log('Geek Markdown: No markdown content in POST data');
        }
    }
    
    public function render_markdown_content($content) {
        global $post;
        
        if (!$post) {
            return $content;
        }
        
        // Check if we should use markdown for this post
        $use_markdown = get_post_meta($post->ID, '_geek_use_markdown', true);
        
        if (!$use_markdown) {
            return $content;
        }
        
        // Get markdown content
        $markdown = get_post_meta($post->ID, '_geek_markdown_content', true);
        
        if (empty($markdown)) {
            return '<div class="notice notice-warning"><p><strong>Geek Markdown:</strong> Markdown is enabled but no content found.</p></div>';
        }
        
        // Parse markdown to HTML
        $parsedown = new Parsedown();
        $html = $parsedown->text($markdown);
        
        return '<div class="geek-markdown-content">' . $html . '</div>';
    }
    
    public function markdown_shortcode($atts, $content = null) {
        if (empty($content)) {
            return '';
        }
        
        $parsedown = new Parsedown();
        $html = $parsedown->text($content);
        
        return '<div class="geek-markdown-content">' . $html . '</div>';
    }
}

// Initialize plugin
GeekMarkdown::get_instance();
