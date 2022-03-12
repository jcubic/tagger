<?php
if(isset($_POST['tags'])) {
	$tags 		= trim($_POST['tags']);
	$usertaginput 	= trim($_POST['usertaginput']);

	function fixedJcubicTaggerBug($tags, $usertaginput) {
		if(!empty($tags)) {
			if(!empty($usertaginput) && strpos($tags, $usertaginput) === false) {
				$tags = $tags . ', ' . $usertaginput;
			}
		}
		else {
			$tags = $usertaginput;
		}
		return $tags;
	}

	$tags = fixedJcubicTaggerBug($tags, $usertaginput);
}
?>

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Tagger Example</title>
		<link href="tagger.css" rel="stylesheet">
		<style>
		div {
			margin-top: 10px;
		}
		</style>
	</head>
	<body>
		<h1>Tagger Example</h1>
		<?php
		if(isset($_POST['tags'])) {
			echo '<p>' . htmlentities($tags) . '</p>';
		}
		?>
		
		<form action="#" method="post">
			<div>
				<label for="usertaginput">TAGS:</label>
				<input id="tags" name="tags" type="text"<?php if(isset($_POST['tags'])) { echo ' value="' . htmlentities($tags) . '"'; } ?>>
			</div>
			<div>
				<input type="submit">
			</div>
		</form>
		
		<script src="tagger.js"></script>
		<script>
		var t2 = tagger(document.querySelector('[name="tags"]'), {
			allow_duplicates: false,
			allow_spaces: true,
			completion: {
				list: function() {}
			},
			link: function() { return false; }
		});
		</script>
	</body>
</html>
