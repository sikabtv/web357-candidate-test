<?php

/**
 * @version    CVS: 1.0.0
 * @package    Mod_Web357_Random_Recipe
 * @author     Web357 Dev <careers@web357.com>
 * @copyright  2025 Web357.com
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Webtest\Module\Web357RandomRecipe\Site\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;

class RandomRecipeHelper
{
    public static function getRandomRecipe()
    {
        $db = Factory::getContainer()->get('DatabaseDriver');
        $query = $db->getQuery(true);

        // Select a random recipe
        $query->select(['id', 'title', 'difficulty', 'serving_size'])
            ->from($db->quoteName('#__web357test_recipes'))
            ->where($db->quoteName('state') . ' = 1')
            ->order('RAND()')
            ->setLimit(1);

        $db->setQuery($query);
        return $db->loadObject();
    }
}
