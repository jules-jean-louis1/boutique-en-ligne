<?php

namespace App\Model;

use PDO;

interface DatabaseInterface
{
    public function getBdd(): PDO;
}