import analyzeApi from "../apis/analyze_api.js";


async function get_report(req, res) {
    
    const experimentName = req.body.testbed_name;
    const moteAddr = req.body.mote_addr;
    const topics = req.body.topics;
    const reportType = req.params.report_type;

    const report = await analyzeApi.get_experiment_data(
        reportType,
        experimentName,
        moteAddr,
        topics
    )

    res.json(report.body);
}


export default {

    get_report
}