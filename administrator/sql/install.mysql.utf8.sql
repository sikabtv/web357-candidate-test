CREATE TABLE IF NOT EXISTS `#__web357test_recipes` (
`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,

`state` TINYINT(1)  NULL  DEFAULT 1,
`ordering` INT(11)  NULL  DEFAULT 0,
`checked_out` INT(11)  UNSIGNED,
`checked_out_time` DATETIME NULL  DEFAULT NULL ,
`created_by` INT(11)  NULL  DEFAULT 0,
`modified_by` INT(11)  NULL  DEFAULT 0,
`title` VARCHAR(255)  NOT NULL ,
`description` TEXT NOT NULL ,
`ingredients` VARCHAR(255)  NOT NULL ,
`cooking_time` DOUBLE NULL ,
`difficulty` VARCHAR(255)  NULL  DEFAULT "",
`serving_size` TINYINT UNSIGNED NOT NULL DEFAULT 10,
PRIMARY KEY (`id`)
,KEY `idx_state` (`state`)
,KEY `idx_checked_out` (`checked_out`)
,KEY `idx_created_by` (`created_by`)
,KEY `idx_modified_by` (`modified_by`)
,KEY `idx_serving_size` (`serving_size`)
) DEFAULT COLLATE=utf8mb4_unicode_ci;

