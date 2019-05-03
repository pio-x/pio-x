<?php

declare(strict_types=1);

namespace PioX\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190503165039 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Add Answer Options';
    }

    public function up(Schema $schema) : void
    {
	    $this->addSql('ALTER TABLE `riddle` ADD `answer_options` LONGTEXT  NULL AFTER `answer`');
	    $this->addSql('ALTER TABLE `riddle` ADD `answer_options_enabled` TINYINT(1)  NOT NULL  DEFAULT \'0\'  AFTER `answer_options`');

    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
