<?php
/**
 * @version    CVS: 1.0.0
 * @package    Com_Web357test
 * @author     Web357 Dev <careers@web357.com>
 * @copyright  2025 Web357.com
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access
defined('_JEXEC') or die;

use \Joomla\CMS\HTML\HTMLHelper;
use \Joomla\CMS\Factory;
use \Joomla\CMS\Uri\Uri;
use \Joomla\CMS\Router\Route;
use \Joomla\CMS\Language\Text;

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
	->useScript('form.validate');
HTMLHelper::_('bootstrap.tooltip');
?>

<form
	action="<?php echo Route::_('index.php?option=com_web357test&layout=edit&id=' . (int) $this->item->id); ?>"
	method="post" enctype="multipart/form-data" name="adminForm" id="recipe-form" class="form-validate form-horizontal">


	<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', array('active' => 'recipe')); ?>
	<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'recipe', Text::_('COM_WEB357TEST_TAB_RECIPE', true)); ?>
	<div class="row-fluid">
		<div class="col-md-12 form-horizontal">
			<fieldset class="adminform">
				<legend><?php echo Text::_('COM_WEB357TEST_FIELDSET_RECIPE'); ?></legend>
				<?php echo $this->form->renderField('title'); ?>
				<?php echo $this->form->renderField('description'); ?>
				<?php echo $this->form->renderField('ingredients'); ?>
				<?php echo $this->form->renderField('cooking_time'); ?>
				<?php echo $this->form->renderField('difficulty'); ?>
				<?php echo $this->form->renderField('serving_size'); ?>
			</fieldset>
		</div>
	</div>
	<?php echo HTMLHelper::_('uitab.endTab'); ?>
	<input type="hidden" name="jform[id]" value="<?php echo isset($this->item->id) ? $this->item->id : ''; ?>" />

	<input type="hidden" name="jform[state]" value="<?php echo isset($this->item->state) ? $this->item->state : ''; ?>" />

	<?php echo $this->form->renderField('created_by'); ?>
	<?php echo $this->form->renderField('modified_by'); ?>


	<?php echo HTMLHelper::_('uitab.endTabSet'); ?>

	<input type="hidden" name="task" value=""/>
	<?php echo HTMLHelper::_('form.token'); ?>

</form>
