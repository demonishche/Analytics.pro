<?php
	function page_class_reports(&$tpl) {
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
		$class_fields = $DS->getClassFields($id);
	    $reports_list =  $Reports->getListOfReports($id);
		$objects_list = $Reports->getObjectListByClassId($id);
		$class_fields_not_text_type = array();
		$class_fields_text_type = array();
		$tpl->replaceVar("CLASS_NAME", $class_info['class_name']);

		foreach($class_fields as $val) {
			if ($val["field_type"] != "TEXT")
				$class_fields_not_text_type[] = $val;
			else
				$class_fields_text_type[] = $val;
		}
		foreach ($reports_list as &$tmp) {
	      $tmp["report_time"] = date("H:i d.m.Y", $tmp["report_time"]);
	    }

		$tpl->replaceLoop("REPORTS_LIST", $reports_list);
		$tpl->replaceLoop("OBJECTS_FOR_REPORT", $objects_list);
		$tpl->replaceLoop("FIELDS_FOR_REPORT", $class_fields_not_text_type);
		if (count($class_fields_text_type) == 0)
			$tpl->removeBlock("HAVE_TEXT_FIELDS");
		else
			$tpl->replaceLoop("TEXT_FIELDS", $class_fields_text_type);

		if ($user_role != 1) {
			$tpl->removeBlock("GROUP_ADMIN");
		}
		$tpl->replaceVar("FAV_TYPE", "report");
	}
?>
