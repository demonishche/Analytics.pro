<?php
	function page_class_objects(&$tpl) {
		global $User;
		$id = $_GET['id'];
		$user_id = $User->getUserId();

		$Reports = new Reports();
		$DS = new DataStructure();
		$Group = new AnalyticsGroup();
		$class_info = $DS->getClass($id);
		if (!$Group->isUserHasAccessToClass($id, $user_id) && ($user_id != $class_info['user_id']))
			header("Location: /data");

		$user_role = $Group->getUserRoleByClassId($id);


		$DS = new DataStructure();
		$objects_list = $DS->getObjectListByClassId($id);
		$class_info = $DS->getClass($id);

		foreach ($objects_list as &$tmp) {
	  		$tmp["obj_time"] = date("H:i d.m.Y", $tmp["obj_time"]);
	    }

		$tpl->replaceVar("CLASS_NAME", $class_info['class_name']);
		$tpl->replaceLoop("OBJECTS_LIST", $objects_list);
		if ($user_role != 1) {
			$tpl->removeBlock("GROUP_ADMIN");
		}
		$tpl->replaceVar("FAV_TYPE", "object");
	}
?>
