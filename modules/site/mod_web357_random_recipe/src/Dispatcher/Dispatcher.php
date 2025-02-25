<?php

namespace Webtest\Module\Web357RandomRecipe\Site\Dispatcher;

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\DispatcherInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Helper\ModuleHelper;
use Webtest\Module\Web357RandomRecipe\Site\Helper\RandomRecipeHelper;

class Dispatcher implements DispatcherInterface
{
    public function dispatch()
    {
        $language = Factory::getApplication()->getLanguage();
        $language->load('mod_web357_random_recipe', JPATH_BASE . '/modules/mod_web357_random_recipe');
        $language->load('com_web357test', JPATH_ADMINISTRATOR);

        $recipe = RandomRecipeHelper::getRandomRecipe();
        require ModuleHelper::getLayoutPath('mod_web357_random_recipe');
    }
}
