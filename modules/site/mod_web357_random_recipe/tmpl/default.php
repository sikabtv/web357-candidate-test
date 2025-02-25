<?php

/**
 * @version    CVS: 1.0.0
 * @package    Mod_Web357_Random_Recipe
 * @author     Web357 Dev <careers@web357.com>
 * @copyright  2025 Web357.com
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

use Webtest\Component\Web357test\Site\Enum\RecipeDifficulty;
use Webtest\Component\Web357test\Site\Enum\ServingSize;

defined('_JEXEC') or die;

if ($recipe) : ?>
    <div class="mod-web357-random-recipe">
        <h3><?php echo $recipe->title ?></h3>

        <div class="recipe-difficulty">
            <?php
            $difficulty = RecipeDifficulty::tryFrom($recipe->difficulty);
            if ($difficulty) {
                echo $difficulty->getHtml();
            }
            ?>
        </div>

        <div class="recipe-serving-size">
            Serving size:
            <?php
            $servingSize = ServingSize::tryFrom($recipe->serving_size);
            if ($servingSize) {
                echo $servingSize->getText();
            }
            ?>
        </div>

        <a href="<?php echo JRoute::_('index.php?option=com_web357test&view=recipe&id=' . (int)$recipe->id); ?>">
            <?php echo JText::_('MOD_WEB357RANDOMRECIPE_VIEW_FULL_RECIPE'); ?>
        </a>
    </div>
<?php else : ?>
    <p><?php echo JText::_('MOD_WEB357RANDOMRECIPE_NO_RECIPE'); ?></p>
<?php endif; ?>
