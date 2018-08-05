<?php
if(isset($_POST['submit'])){
	$code=$_POST['code'];
	echp "<br/>.$code;

?>
<html>
<form method="POST" action="pre.php">
<input type="text" name="code">
<input type="submit" value="ok">
</form>
</html>