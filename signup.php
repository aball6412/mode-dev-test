<?php

    //BE SURE TO GET RID OF * FOR PRODUCTION USE
    //INSTEAD CREATE A LIST OF HEADERS THAT ALLOW MY SPECIFIC DOMAIN TO BE USED
    header("Access-Control-Allow-Origin: *");

    //Get/Create the required variables
    $email_address = $_POST["email_address"];
    $timestamp = $_POST["timestamp"];
    $database = "email addresses";

    //DEV INFO/////////////
//    $username = "root";
//    $password = "root";
//    $host = "localhost";
//    $port = "8889";
    /////////////////

    $username = getenv("DB_USERNAME");
    $password = getenv("DB_PASSWORD");
    $host = getenv("CLEARDB_DATABASE_URL");
    $port = NULL;

    //Open up MySQL connection
    $conn = mysqli_connect($host, $username, $password, $database, $port);
    if (!$conn) {
        die("Connection Failed: " . mysqli_connect_error());
    }
    
    //Create query string to check and insert user data
    $check_query = "SELECT address FROM email_addresses WHERE address='" . $email_address ."'";
    $insert_query = "INSERT INTO email_addresses (address, timestamp) VALUES ('" . $email_address . "', '" . $timestamp . "')";
    
    //Run the query and get the result
    $result = mysqli_query($conn, $check_query);
    
    //Put the result in an array and count array length
    $check = mysqli_fetch_array($result);
    $count = count($check);

    //If check variable is greater than 0 then we have a duplicate
    //Exit out of script if that that's the case
    if ($count > 0) {
        echo "Duplicate";
        exit();
    }

    //Run insert query through database
    if (mysqli_query($conn, $insert_query)) {
        echo "Success";
    }
    else {
        echo "Error";
    }

?>