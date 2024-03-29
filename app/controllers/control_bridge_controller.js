import cbapi from "../apis/control_bridge_api.js";


async function create_control_msg(req, res) {
    const msg = {
        "action": req.body?.action || "",
        "testbed": req.body?.experiment_name || "",
        "provision": {
            "mote_count": req.body?.mote_count || 0,
            "tx_power": req.body?.tx_power || 0,
            "tx_intv": req.body?.tx_intv || 0,
            "analyze_intv": req.body?.analyze_intv || 0,
            "hs_len": req.body?.hs_len || 0,
            "hopseq": req.body?.hopseq || ""
        }
    };

    try {
        const response = await cbapi.create_control_msg(msg);

        if (response.status == 202) {
            res.redirect(`/experiment?experiment=${msg["testbed"]}`);
        } else {
            throw new Error;
        }

    } catch {
        res.render(
            "pages/message",
            { "msg": "Failed to send control message." }
        );
    }
}


export default {
    create_control_msg
};
