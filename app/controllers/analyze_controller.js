import analyzeApi from "../apis/analyze_api.js";


async function get_experiments(req, res) {
    try {
        const response = await analyzeApi.get_experiments();

        if (response.status == 200) {
            res.render(
                "pages/experiments",
                { "experiments": response.body.testbed.testbed }
            );
        } else {
            throw new Error;
        }

    } catch {
        res.render(
            "pages/message",
            { "msg": "Failed to get experiments." }
        );
    }
}


export default {
    get_experiments
};
