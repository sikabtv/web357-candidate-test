<?php
/**
 * @version    CVS: 1.0.0
 * @package    Com_Web357test
 * @author     Web357 Dev <careers@web357.com>
 * @copyright  2025 Web357.com
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Webtest\Component\Web357test\Site\Enum;

defined('JPATH_PLATFORM') or die;

use Joomla\CMS\Language\Text;

/**
 * Available values for "difficulty" attribute
 *
 * @since  1.0.0
 */
enum RecipeDifficulty: string
{
    case EASY = 'easy';
    case MEDIUM = 'medium';
    case HARD = 'hard';

    /**
     * Get the readable text
     */
    public function getText(): string
    {
        return match ($this) {
            self::EASY => Text::_('COM_WEB357TEST_RECIPES_DIFFICULTY_OPTION_EASY'),
            self::MEDIUM => Text::_('COM_WEB357TEST_RECIPES_DIFFICULTY_OPTION_MEDIUM'),
            self::HARD => Text::_('COM_WEB357TEST_RECIPES_DIFFICULTY_OPTION_HARD'),
        };
    }

    /**
     * Get the HTML representation
     */
    public function getHtml(): string
    {
        $stars = match ($this) {
            self::EASY => 1,
            self::MEDIUM => 2,
            self::HARD => 3,
        };

        $starsHtml = str_repeat('<i class="fa-solid fa-star"></i>', $stars);

        return sprintf(
            '<div class="recipe-difficulty d-flex">
                <span class="visually-hidden">%s</span>%s
            </div>',
            $this->getText(),
            $starsHtml
        );
    }
}
