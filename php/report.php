<?
    function page_report(&$tpl) {
        $id = $_GET['id'];

        $Reports = new Reports();
        $Group = new AnalyticsGroup();

        if (!$Reports->isReportExists($id))
            header("Location: /data");

        $report_settings = $Reports->getReportSettings($id);
        $user_role = $Group->getUserRoleByClassId($report_settings['class_id']);

        if ($user_role == 0) {
            $user_reports = $Group->getReportsIdByUser($report_settings['class_id']);
            if ($user_reports == -2 || !in_array($id, $user_reports))
                header("Location: /data");
        }

    }
?>
