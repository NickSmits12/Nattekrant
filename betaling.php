<?php

require_once __DIR__ . "/vendor/autoload.php";

use Mollie\Api\MollieApiClient;

$mollie = new MollieApiClient();

// gebruik hier je TEST key uit het Mollie dashboard
$mollie->setApiKey("test_xxxxxxxxxxxxxxxxxxxxx");

try {

    $payment = $mollie->payments->create([
        "amount" => [
            "currency" => "EUR",
            "value" => "5.00"
        ],
        "description" => "Test betaling portfolio site",
        "redirectUrl" => "http://localhost/succes.php",
        "metadata" => [
            "test" => "portfolio"
        ],
    ]);

    header("Location: " . $payment->getCheckoutUrl());
    exit;

} catch (\Mollie\Api\Exceptions\ApiException $e) {

    echo "Fout bij aanmaken betaling: " . htmlspecialchars($e->getMessage());

}