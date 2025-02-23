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
 * Available values for "Serving Size" attribute
 *
 * @since  1.0.0
 */
enum ServingSize: int
{
    case SERVING_SIZE_OPTION_1_2 = 10;
    case SERVING_SIZE_OPTION_2_4 = 20;
    case SERVING_SIZE_OPTION_4_6 = 30;
    case SERVING_SIZE_OPTION_6_8 = 40;
    case SERVING_SIZE_OPTION_8_PLUS = 50;

    /**
     * Get the readable text
     */
    public function getText(): string
    {
        return match ($this) {
            self::SERVING_SIZE_OPTION_1_2 => Text::_('COM_WEB357TEST_RECIPES_SERVING_SIZE_OPTION_1_2'),
            self::SERVING_SIZE_OPTION_2_4 => Text::_('COM_WEB357TEST_RECIPES_SERVING_SIZE_OPTION_2_4'),
            self::SERVING_SIZE_OPTION_4_6 => Text::_('COM_WEB357TEST_RECIPES_SERVING_SIZE_OPTION_4_6'),
            self::SERVING_SIZE_OPTION_6_8 => Text::_('COM_WEB357TEST_RECIPES_SERVING_SIZE_OPTION_6_8'),
            self::SERVING_SIZE_OPTION_8_PLUS => Text::_('COM_WEB357TEST_RECIPES_SERVING_SIZE_OPTION_8_PLUS'),
        };
    }

}
