<?php

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $email = $_POST['email'];
  $comment = $_POST['comment'];

  $response = new stdClass();
  $errors = array();

  $to = 'joey_greco_16@hotmail.com';
  $subject = "New message from $firstName" . " " . $lastName . "!";
  $message = $comment;
  $headers = $email;

// Make an IF statement for each validation rule
if( empty($comment) ){
  $error = new stdClass();
  $error->field = "comment";
  $errors[] = $error;
}
if( empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) ){
  $error = new stdClass();
  $error->field = "email";
  $errors[] = $error;
}
if ( isset($errors) ){
  $response->errors = $errors;
  $response->status->message="Please check all required fields.";
  $response->status->status="error";
} else if (!mail($to, $subject, $message, $headers)) {
  $response->status->message="The message wasn't delivered. Try calling me!";
  $response->status->status="error";
} else {
  $response->status->message="Thanks for your message, $firstName!";
  $response->status->status="success";
}
echo json_encode($response);

?>
